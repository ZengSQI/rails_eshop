class OrderMailer < ApplicationMailer
    default :from => "EShop Agnet <noreply@example.org>"

    def notify_order(email, name, addr, products)
        @email = email
        @name = name
        @addr = addr
        @products = products
        mail(:to => @email, :subject => "Your order confirmation from Rails EShop.")
    end
end
