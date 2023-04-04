FROM node:18

RUN apt-get update && apt-get install fish vim curl sudo -y && \
    echo "fish" >>~/.bashrc

RUN echo 'root:123' | chpasswd
RUN echo 'node:123' | chpasswd

RUN sudo usermod -a -G sudo node

USER node

RUN echo "fish" >>~/.bashrc
# RUN mkdir -p ~/.config/fish/
# RUN echo "alias sh 'fish '" >>~/.config/fish/config.fish

WORKDIR /app

ENV PORT=5055

EXPOSE 5055

