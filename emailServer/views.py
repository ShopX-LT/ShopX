import os
import json
import smtplib
from dotenv import load_dotenv
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from pathlib import Path
from flask import Blueprint, render_template, request


views = Blueprint(__name__, "views")

load_dotenv()  # take environment variables from .env.
SENDER_EMAIL = os.environ.get("SENDER_EMAIL")
PASSWORD = os.environ.get("PASSWORD")
STORE_NAME = "ShopX"
PORT = 587
EMAIL_SERVER = "smtp.gmail.com"

default_body = f"""\
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
    receiver_email, header=STORE_NAME, subject="", html_body=default_body, plain_body=""
):
    # Create the base text message.
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = formataddr((header, f"{SENDER_EMAIL}"))
    msg["To"] = receiver_email
    msg["BCC"] = SENDER_EMAIL

    msg.attach(MIMEText(plain_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(EMAIL_SERVER, PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, PASSWORD)
        server.sendmail(SENDER_EMAIL, receiver_email, msg.as_string())


def send_welcome_email(receiver_email):
    EMAIL_HEADER = "Welcome to ShopX"
    SUBJECT = "Your Journey To Greatness Has Begun"

    # Read the HTML template file
    email_template = render_template("signup_template.html")
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


@views.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        receiver = data["receiver"]

        send_welcome_email(receiver)
        response = {"success": True}
        json_obj = json.dumps(response)
    except Exception as e:
        print("Error sending email:", e)
        response = {"success": False}
        json_obj = json.dumps(response)
    return json_obj
