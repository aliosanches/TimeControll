# TimeControll.js
Manage Time with JavaScript

**TimeControll** can be used with a function or instantiated as an object in both forms will be returned an object with functions and information of the time informed, has several functionalities for control and administration of time, and can be used for calculation with time or as a simple clock.

To get started, checkout examples and documentation at http://timecontroll.com

# Usability
```
TimeControll ( timeParam, decrement, startParam, just24, timeInThePage, getTime, debug );
or 
var timeObj = TimeControll ( timeParam, decrement, startParam, just24, timeInThePage, getTime, debug ); 
or 
var timeObj = new TimeControll ( timeParam, decrement, startParam, just24, timeInThePage, getTime, debug );
```

| Parameter | Value | Utility |
| --- | --- | --- |
| timeParam | String or Object | Sets the initial time of the function or receives an object with the settings, if value is not valid, the function set the current time to be started. |
| decrement | Boolean true/false | If true the time informed will work in a regressive way. |
| startParam | Boolean true/false | If true the time count is started at the time of the function call. |
| just24 | Boolean true/false | If true the time count is performed up to 24 hours and starting again from 00:00:00. |
| timeInThePage | Boolean true/false | If true will conduct a parallel count to the main but only when the **document.hasFocus ()** is equal to **true**. |
| getTime | Function Callback, function(Time, Seconds, TimeArray, TimeControllObject) | If it is informed, every second interval is executed, it returns the time it is in, this same time converted to the second, this time in Array format and the function control object. |
| debug | Boolean true/false | If true it will display the time it is in the **console** of the browser. |

# Functions
**setTime( String )**

When using this function the time that was being used in the count is changed.
```
var timeObj = TimeControll ( '00:00:00' ); //start
timeObj.setTime( '00:15:00' ); // change value to 00:15:00
```
**addSeconds( Int )**

When using this function will be add the amount of seconds informed to the current time.
```
var timeObj = TimeControll ( '00:00:00' ); //start
timeObj.addSeconds( 30 ); // change value to 00:00:30
```
**addMinutes( Int )**

Using this function will add the amount of minutes informed to the current time.
```
var timeObj = TimeControll ( '00:00:00' ); //start
timeObj.addMinutes( 30 ); // change value to 00:30:00
```
**addHours( Int )**

Using this function will add the amount of hours informed to the current time.
```
var timeObj = TimeControll ( '00:00:00' ); //start
timeObj.addHours( 30 ); // change value to 30:00:00
```
**subSeconds( Int )**

Using this function will subtract the amount of seconds informed to the current time.
```
var timeObj = TimeControll ( '00:01:00' ); //start
timeObj.subSeconds( 30 ); // change value to 00:00:30
```
**subMinutes( Int )**

Using this function will subtract the amount of minutes informed to the current time.
```
var timeObj = TimeControll ( '01:00:00' ); //start
timeObj.subMinutes( 30 ); // change value to 00:30:00
```
**subHours( Int )**

Using this function will subtract the amount of hours informed to the current time.
```
var timeObj = TimeControll ( '02:00:00' ); //start
timeObj.subHours( 1 ); // change value to 01:00:00
```
**start( )**

When using this function the count will start or return from where it was paused
```
var timeObj = TimeControll ( '02:00:00' ); //the count is stop
timeObj.start(); // the count will be started
```
**restart( )**

When using this function, the count is started but using the time that was entered when instantiating the function.
```
var timeObj = TimeControll ( '02:00:00' ); //start
// after an time
timeObj.restart(); // the count will be started in 02:00:00
```
**pause( )**

When using this function the time count will be stopped until the **start** or **restart** function is used.
```
var timeObj = TimeControll ( '02:00:00' ); //start
timeObj.pause(); // the count will be stoped in 02:00:00
```
**toArray( )**

Using this function returns the current time in array format.
```
var timeObj = TimeControll ( '02:00:00' ); //start
timeObj.toArray(); // return ['02', '00', '00']
```
**toSeconds( )**

Using this function will return the current time in seconds.
```
var timeObj = TimeControll ( '02:00:00' ); //start
timeObj.toSeconds(); // return 7200
```
**toMinutes( )**

Using this function will return the current time in minutes.
```
var timeObj = TimeControll ( '02:30:00' ); //start
timeObj.toMinutes(); // return 150
```
**toHours( )**

Using this function will return the current time in hours.
```
var timeObj = TimeControll ( '02:30:00' ); //start
timeObj.toHours(); // return 2
```
**diffTime( String, Bool, Bool )**

When using this function, the difference between the current time and the informed time is returned, if the second parameter is true the calculation is inverted for the time informed less the current time and if the third parameter is true, the time that instantiated the function is used and not the current time.
```
var timeObj = TimeControll ( '02:00:00' ); //start
timeObj.diffTime( '01:00:00' ); // return '01:00:00'
```
**pretty( )**

When using this function, text will be returned in extenso of the current time.
```
var timeObj = TimeControll ( '02:05:30' ); //start
timeObj.pretty(); // return '2 hours and 5 minutes and 30 seconds'
```
