Для запуска на Win 11 заменить значение поля test в файле package.json на "_mocha --reporter spec"

Для приведения дат к нужному формату использовал moment js - библиотека с широким функционалом парсинга и форматирования дат + локализация! 

Предположил что {type: 'd'}, переданный из test.js намекает на тип обрабатываемых данных ('d' - даты). Исходя их этого, модуль обрабатывает даты если type: 'd' или выбрасывает ошибку в противном случае.

Далее десутруктурирую передаваемый в функцию source_d объект, получаю исходную дату и убираю символы ковычек, дабы в дальнейшем упростить парсинг

Следующим действием устанавливаю форматы даты, времени и таймзоны путём регулярных выражений. Прохожусь по объектам с форматами циклом, дабы распарсить входящую дату на токены и составляю комбинацию дата/формат для использования в библиотеке moment.js

В зависимости от наличия тайзоны в исходной строке даты, возвращаю строку в формате с таймзоной или без
