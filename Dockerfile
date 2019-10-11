FROM python:3.8.0rc1-alpine3.10
ADD . /src
WORKDIR /src

EXPOSE 80

CMD ["python3", "arduino_web_server.py"]

RUN echo -e "Connect to docker container by running:\n\t docker run -it -p=8080:8080 <docker-tag>"
