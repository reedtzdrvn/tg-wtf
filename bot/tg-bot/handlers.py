from aiogram import Bot, F, Router
from aiogram.filters import Command
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    MenuButtonWebApp,
    Message,
    WebAppInfo,
)

router = Router()


@router.message(Command(commands=["start"]))
async def start_handler(msg: Message):
    await msg.answer("Привет! Чтоб получить доступ к веб приложению введите команду \web")


@router.message(Command(commands=["web"]))
async def command_webview(message: Message):
    await message.answer(
        "Good. Now you can try to send it via Webview",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="Open Webview", web_app=WebAppInfo(url='https://aquamarine-dasik-75f62c.netlify.app/')
                    )
                ]
            ]
        ),
    )