[![Build Status](https://travis-ci.org/Rabinzon/read-quran.ru.svg?branch=master)](https://travis-ci.org/Rabinzon/read-quran.ru)

Site for reading Quran in chronological order [read-quran.ru](http://read-quran.ru)

For development requires `docker`, `docker-compose`, `ansible`.

For the run on local machine just run following commands:

```sh
make app-setup // only once
make app
```

You can change environment variables in `ansible` directory

This project develop with [koa](https://github.com/koajs), [postgres](https://github.com/postgres/postgres),
[sequelize](https://github.com/sequelize/sequelize) and [bootstrap](https://github.com/twbs/bootstrap).
