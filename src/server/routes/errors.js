function errorsHandler(err, req, res, next) {
  const { url } = req;
  const { message } = err;
  if (url.includes('user') || url.includes('sign')) {
    if (message.includes('Cast to ObjectId failed for value')) {
      res.status(400).send({ message: 'Запрос не может быть понят сервером из-за некорректного синтаксиса. Проверьте правильность id.' });
    } else if (message.includes('user validation failed:')) {
      if (message.includes('expected `email` to be unique')) {
        res.status(409).send({ message: 'Пользователь с таким email уже существует.' });
      }
      res.status(422).send({ message: 'Неверно заполнено одно из полей. Пользователь не может быть создан.' });
    } else if (message.includes('no such user')) {
      res.status(404).send({ message: 'Пользователь с данным id не найден.' });
    } else res.status(500).send({ message: 'Произошла ощибка на сервере' });
  }
  if (url.includes('card')) {
    if (message.includes('Cast to ObjectId failed for value')) {
      res.status(400).send({ message: 'Запрос не может быть понят сервером из-за некорректного синтаксиса.' });
    } else if (message.includes('card validation failed:')) {
      res.status(422).send({ message: 'Неверно заполнено одно из полей. Карточка не может быть создана.' });
    } else res.status(500).send({ message: 'Произошла ощибка на сервере' });
  }
  return next(err);
}

module.exports = errorsHandler;
