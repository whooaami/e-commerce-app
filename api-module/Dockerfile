FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBITECODE 1

WORKDIR /api-module

COPY requirements.txt /api-module/

RUN pip install -r requirements.txt

COPY . /api-module/
COPY entrypoint.sh /api-module/

EXPOSE 8000

RUN chmod +x /api-module/entrypoint.sh

CMD [ "./entrypoint.sh"]
