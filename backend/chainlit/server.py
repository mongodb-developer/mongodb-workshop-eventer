
from openai import AsyncOpenAI
import chainlit as cl
import chainlit.data as cl_data
from pymongo import MongoClient
import os
client = AsyncOpenAI()




# Instrument the OpenAI client
cl.instrument_openai()

settings = {
    "model": "gpt-4o-mini",
    "temperature": 0,
    # ... more settings
}

mdb_client = MongoClient(os.environ.get('MONGODB_ATLAS_URI'))
db = mdb_client['eventer']
global collection
collection = db['events']


@cl.on_message
async def on_message(message: cl.Message):
    context = "Generic knowldege"
    history = cl.chat_context.to_openai()
    history.append({"role": "user", "content": f" With the relevant context: {context} \n Assist with to the user message {message.content}. If you don't see the details in cotext please respond that you could not find any details for that query."})
    input_messages=[
            {
                "content": "You are a helpful assistant, please respond to user searches on events and their details.",
                "role": "system"
            }]
    #combine arrays of messages
    input_messages = input_messages + history
    input_messages = input_messages.append({"content": f"Answer user query {message.content}, use context: {context} to answer. If no relevant context provided ask the user to retry",
                "role": "user"
    }
    response = await client.chat.completions.create(
        messages=input_messages,
        **settings
    )
    await cl.Message(content=response.choices[0].message.content).send()

@cl.on_chat_start
async def on_chat_start():
    await cl.Message(content="Hello, I am an assistant ready to assist with your event searches!").send()
