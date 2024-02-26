from aiogram import Bot, F, Router
from aiogram.filters import Command, CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    Message,
    WebAppInfo,
)
from db import Db

router = Router()


@router.message(CommandStart())
async def start_handler(msg: Message):
    await msg.answer(
        "Привет! Чтоб получить доступ к веб приложению необходимо поделиться номером телефона, чтобы зарегистрироваться в интернет-магазине.",
        reply_markup=ReplyKeyboardMarkup(
            keyboard=[
                [KeyboardButton(text="Поделиться контактом", request_contact=True)]
            ]
        ),
    )


@router.message(F.contact)
async def contacts(msg: Message):
    database = Db()
    if database.add_user(
        msg.contact.first_name,
        msg.contact.last_name,
        msg.from_user.username,
        msg.contact.phone_number,
        msg.contact.user_id,
    ):
        await msg.answer(
            f"Пользователь успешно добавлен. Введите команду /web для доступа к веб-приложению.",
            reply_markup=ReplyKeyboardRemove(),
        )
    else:
        await msg.answer(
            "Произошла ошибка при добавлении пользователя. \
                Напишите команду /start еще раз. Либо введите команду /web, если вы уже зарегистрированы в веб-приложении",
            reply_markup=ReplyKeyboardRemove(),
        )


@router.message(Command(commands=["web"]))
async def command_webview(message: Message):
    await message.answer(
        "Хороших покупок!",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="Open Webview",
                        web_app=WebAppInfo(
                            url="https://aquamarine-dasik-75f62c.netlify.app/"
                        ),
                    )
                ]
            ]
        ),
    )
