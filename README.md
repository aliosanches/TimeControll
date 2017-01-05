# TimeControll
Manage Time with JavaScript

**TimeControll** pode ser utlizada com uma função ou instanciada como um objeto em ambas as formas será retornado 
um objeto com funções e informações do tempo informado, possui varias funcionalides para controle e administração do tempo, 
podendo ser utilizada para calcúlos com hora ou como um simples relógio.

| Parameter | Value | Utility |
| --- | --- | --- |
| timeParam | String or Object | Sets the initial time of the function or receives an object with the settings, if value is not valid, the function set the current time to be started. |
| decrement | Boolean true/false | If true the time informed will work in a regressive way. |
| startParam | Boolean true/false | If true the time count is started at the time of the function call. |
| just24 | Boolean true/false | If true the time count is performed up to 24 hours and starting again from 00:00:00. |
| timeInThePage | Boolean true/false | If true will conduct a parallel count to the main but only when the **document.hasFocus ()** is equal to **true**. |
| getTime | Function Callback, function(Time, Seconds, TimeArray, TimeControllObject) | If it is informed, every second interval is executed, it returns the time it is in, this same time converted to the second, this time in Array format and the function control object. |
| debug | Boolean true/false | If true it will display the time it is in the **console** of the browser. |
