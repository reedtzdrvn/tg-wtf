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

database = Db()


@router.message(CommandStart())
async def start_handler(msg: Message):
    await msg.answer(
        "Привет! Чтоб получить доступ к веб приложению необходимо поделиться номером телефона, чтобы зарегистрироваться в интернет-магазине.",
        reply_markup=ReplyKeyboardMarkup(
            is_persistent=True,
            resize_keyboard=True,
            keyboard=[
                [KeyboardButton(text="Поделиться контактом", request_contact=True)]
            ],
        ),
    )


@router.message(F.contact)
async def contacts(msg: Message):
    if database.add_user(
        msg.contact.first_name,
        msg.contact.last_name,
        msg.from_user.username,
        msg.contact.phone_number,
        msg.contact.user_id,
    ):
        await msg.answer(
            f"Пользователь успешно добавлен. Теперь вы можете перейти в веб-приложение.",
            reply_markup=ReplyKeyboardMarkup(
                is_persistent=True,
                resize_keyboard=True,
                keyboard=[[KeyboardButton(text="Открыть веб-приложение")]],
            ),
        )
    else:
        markup = ReplyKeyboardMarkup(
            is_persistent=True,
            resize_keyboard=True,
            keyboard=[
                [KeyboardButton(text="Зарегистрироваться в веб-приложении")],
                [KeyboardButton(text="Открыть веб-приложение")],
            ],
        )

        await msg.answer(
            "Произошла ошибка при добавлении пользователя.", reply_markup=markup
        )


@router.message()
async def process_command(msg: Message):
    if msg.text == "Открыть веб-приложение":
        await command_webview(msg)
    elif msg.text == "Зарегистрироваться в веб-приложении":
        await start_handler(msg)


@router.message(Command(commands=["web"]))
async def command_webview(message: Message):
    user = database.find_user_by_telegram_id(message.from_user.id)
    if user:
        await message.answer(
            "Хороших покупок!",
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text="Open Webview",
                            web_app=WebAppInfo(
                                url="https://aquamarine-dasik-75f62c.netlify.app"
                            ),
                        )
                    ]
                ]
            ),
        )
    else:
        await message.answer(
            "Вы не зарегистрированы в веб-приложении. Поделитесь контактом, чтобы зарегистрироваться",
            reply_markup=ReplyKeyboardMarkup(
                keyboard=[
                    [KeyboardButton(text="Поделиться контактом", request_contact=True)]
                ]
            ),
        )
