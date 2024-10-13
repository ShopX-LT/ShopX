"""Routes for sending email"""

import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from dotenv import load_dotenv
from flask import Blueprint, render_template, request

views = Blueprint(__name__, "views")

load_dotenv()  # take environment variables from .env.
shopx_email = os.environ.get("SENDER_EMAIL")
password = os.environ.get("PASSWORD")
SHOPX = "ShopX"
PORT = 587
EMAIL_SERVER = "smtp.gmail.com"

DEFAULT_BODY = """\
    <html>
      <body>
        <h1>Hi ,</h1>
        <br />
        <p>Thank you for choosing to shop with us.</p>
        <br />
        <br />
        <p>Thank you</p>
      </body>
    </html>
    """


def send_email(
    receiver_email, header=SHOPX, subject="", html_body=DEFAULT_BODY, plain_body=""
):
    """Sends an email with a plain text and HTML version.

    Args:
    header(str): The header of the email
    subject (str): The email subject.
    receiver_email (str): The recipient's email address.
    plain_body (str): The plain text content of the email.
    html_body (str): The HTML content of the email.
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = formataddr((header, f"{shopx_email}"))
    msg["To"] = receiver_email

    msg.attach(MIMEText(plain_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(EMAIL_SERVER, PORT) as server:
        server.starttls()
        server.login(shopx_email, password)
        server.sendmail(shopx_email, receiver_email, msg.as_string())


# ___Welcome Email___
def send_welcome_email(receiver_email):
    EMAIL_HEADER = "Welcome to ShopX"
    SUBJECT = "Your Journey To Greatness Has Begun"

    # Read the HTML template file
    email_template = render_template("signup_template.jinja.html")
    email_content_plain = """Hello,
        
        Congratulations and a warm welcome to ShopX! We are thrilled to have you on board as our newest user.
        
        At ShopX, our mission is to empower entrepreneurs like you with the tools and resources necessary to bring your e-commerce vision to life.
        
        Get ready to embark on an exciting journey of entrepreneurship and success!
        
        To get started, simply log in to your account using the credentials you provided during sign-up.
        
        If you have any questions, feedback, or suggestions, don't hesitate to reach out to us.
        Happy selling!
        
        Best regards,
        Raheem
        Website: https://myshopx.net
    """
    send_email(
        receiver_email, EMAIL_HEADER, SUBJECT, email_template, email_content_plain
    )


# ___Subscription Email___
def send_subscription_email(receiver_email):
    EMAIL_HEADER = "Welcome to ShopX"
    subject = "Thank you for joining our mailing list"

    # Read the HTML template file
    email_template = render_template("subscription_template.jinja.html")
    email_content_plain = """Hello,
        
        Congratulations and a warm welcome to ShopX! We are thrilled to have you on board as our newest user.
        
        At ShopX, our mission is to empower entrepreneurs like you with the tools and resources necessary to bring your e-commerce vision to life.
        
        Get ready to embark on an exciting journey of entrepreneurship and success!
        
        We are set to launch on the 18th of September, but your are free to play around with the demo version we have running.

        Note that you will have to create a new account once we launch. 

        If you would like to leave a feedback you can reply to this email.

        We very much appreciate and value as our customer. 
        
        Best regards,
        Raheem
        Website: https://myshopx.net
    """
    send_email(
        receiver_email, EMAIL_HEADER, subject, email_template, email_content_plain
    )


def store_send_new_order_email(orderData):
    """Notify a store that they have a new order."""
    EMAIL_HEADER = "ShopX"
    subject = f'{orderData["storeName"]} Has A New Order For  ₦{orderData["subTotal"]}'
    receiver_email = orderData["receiver"]
    orderData["isAdmin"] = 1

    email_template = render_template(
        "new_order_template.jinja.html", orderData=orderData
    )
    send_email(receiver_email, EMAIL_HEADER, subject, email_template)


def user_send_new_order_email(orderData):
    """Send confirmation email to the user that placed an order."""
    EMAIL_HEADER = f'ShopX - {orderData["storeName"]}'
    subject = f'Your Order Has Been Sent To {orderData["storeName"]}'
    receiver_email = orderData["orderedBy"]
    orderData["isAdmin"] = 0

    email_template = render_template(
        "new_order_template.jinja.html", orderData=orderData
    )
    send_email(receiver_email, EMAIL_HEADER, subject, email_template)


def update_order_email(orderData):
    """Send update email to the user that placed an order."""
    EMAIL_HEADER = f'ShopX - {orderData["storeName"]}'
    subject = "An Update On Your Order!"
    receiver_email = orderData["orderedBy"]

    email_template = render_template(
        "update_order_template.jinja.html", orderData=orderData
    )
    send_email(receiver_email, EMAIL_HEADER, subject, email_template)


def send_new_visit_email():
    receiver_email = "myshopxinfo@gmail.com"
    EMAIL_HEADER = "New Visit"
    subject = "New Visit"
    send_email(receiver_email, EMAIL_HEADER, subject)


"""************************Views*************************************"""


@views.route("/signup", methods=["POST"])
def signup() -> None:
    try:
        data = request.get_json()
        receiver = data["receiver"]

        send_welcome_email(receiver)
        response = {"success": True}
        json_obj = json.dumps(response)
    except Exception as e:
        print("Error sending signup email:", e)
        response = {"success": False}
        json_obj = json.dumps(response)
    return json_obj


@views.route("/sub", methods=["POST"])
def subscription():
    try:
        data = request.get_json()
        receiver = data["receiver"]

        send_subscription_email(receiver.strip())
        response = {"success": True}
        json_obj = json.dumps(response)
    except Exception as e:
        print("Error sending subscription email:", e)
        response = {"success": False}
        json_obj = json.dumps(response)
    return json_obj


@views.route("/new-order", methods=["POST"])
def new_order():
    try:
        orderData = request.get_json()

        user_send_new_order_email(orderData)
        store_send_new_order_email(orderData)
        response = {"success": True}
        json_obj = json.dumps(response)

    except Exception as e:
        print("Error sending new order email:", e)
        response = {"success": False}
        json_obj = json.dumps(response)
    return json_obj


@views.route("/update-order", methods=["POST"])
def update_order():
    try:
        orderData = request.get_json()
        update_order_email(orderData)
        response = {"success": True}
        json_obj = json.dumps(response)

    except Exception as e:
        print("Error sending new order email:", e)
        response = {"success": False}
        json_obj = json.dumps(response)
    return json_obj


@views.route("/newvisit", methods=["GET"])
def new_visit():
    try:
        send_new_visit_email()
        response = {"success": True}
        json_obj = json.dumps(response)

    except Exception as e:
        print("Error sending new visit email:", e)
        response = {"success": False}
        json_obj = json.dumps(response)
    return json_obj
