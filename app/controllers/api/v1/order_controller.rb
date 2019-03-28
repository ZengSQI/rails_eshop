class Api::V1::OrderController < ApplicationController
    skip_before_action :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

    def create
        name = params[:name]
        email = params[:email]
        address = params[:addr]
        selected = params[:selected]
        status = 1
        lock_products = []
        for n in selected
            product = Product.find(n)
            if not product
                status = 0
                break
            elsif product.amount <= 0
                status = -1
                break
            else
                product.lock!
                lock_products.push product
            end
        end
        if status > 0
            for product in lock_products
                product.amount -= 1
                product.save!
            end
            OrderMailer.notify_order(email, name, address, lock_products).deliver_later!
        else
            for product in lock_products
                product.save!
            end
        end
        render json: { :status => status, :products => Product.all }.to_json
    end

    private
        def order_params
            params.require(:order).permit(:name, :email, :addr, :selected)
        end
end