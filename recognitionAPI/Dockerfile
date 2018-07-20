FROM ubuntu:xenial
# update and install dependencies
ENV TZ 'Europe/Amsterdam'
RUN echo $TZ > /etc/timezone && \
  apt-get update && apt-get install -y tzdata && \
  rm /etc/localtime && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata && \
  apt-get clean
RUN apt-get update \
  && apt-get install -y \
      software-properties-common \
      wget \
  && add-apt-repository -y ppa:ubuntu-toolchain-r/test \
  && apt-get update \
  && apt-get install -y \
      make \
      git \
      curl \
      vim \
      vim-gnome \
  && apt-get install -y cmake=3.5.1-1ubuntu3 \
  && apt-get install -y \
      gcc-4.9 g++-4.9 gcc-4.9-base \
      gcc-4.8 g++-4.8 gcc-4.8-base \
      gcc-4.7 g++-4.7 gcc-4.7-base \
      gcc-4.6 g++-4.6 gcc-4.6-base \
  && update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 100 \
  && update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.9 100 \
  && apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /code
 WORKDIR /code
 COPY requirements.txt /code/
 RUN pip install -r requirements.txt
 COPY . /code/
 EXPOSE 80
 CMD ["python3","manage.py runserver"]