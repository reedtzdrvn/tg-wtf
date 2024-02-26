from pymongo import MongoClient

from config import DB_URL

class Db:
    def __init__(self):
        self.client = MongoClient(DB_URL)
        self.db = self.client["WTF"]
        self.collection = self.db["user"]

        try:
            self.db.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)

    def find_user_by_telegram_id(self, telegram_id):
        existing_user = self.collection.find_one({"telegramId": str(telegram_id)})
        return existing_user

    def add_user(self, first_name, last_name, username, phone, telegram_id):
        if phone[0] == '+':
            phone = phone[1:]
        user = self.find_user_by_telegram_id(telegram_id)
        if user:
            return False
        else:
            user_data = {
                "firstName": first_name,
                "lastName": last_name,
                "userName": username,
                "phoneNumber": phone,
                "telegramId": str(telegram_id)
            }
            try:
                self.collection.insert_one(user_data)
                print("User added successfully!")
                return True
            except Exception as e:
                print(f"Error adding user: {e}")
                return False