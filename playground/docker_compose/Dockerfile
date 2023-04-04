FROM node:18

RUN apt-get update && apt-get install fish vim curl mc sudo -y && \
	echo "fish" >>~/.bashrc

RUN echo 'root:12345678' | chpasswd
RUN echo 'node:12345678' | chpasswd

RUN sudo usermod -a -G sudo node

USER node

RUN echo "fish" >>~/.bashrc

WORKDIR /app

ENV PORT=5055

EXPOSE 5055

