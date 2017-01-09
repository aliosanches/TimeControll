/* TimeControll, (c) 2017 
 * @Author Alisson Sanches
 * @license MIT 
 */

function TimeControll ( timeParam, decrement, startParam, just24, timeInThePage, getTime, debug ){
    var interval = null;
    var seconds24 = 86400;
    var main = {
        timeParam: timeParam,
        decrement: decrement,
        startParam: startParam,
        just24: just24,
        timeInThePage: timeInThePage,
        getTime: getTime,
        debug: debug,
    }

    if( typeof timeParam == 'object' && timeParam != null ){
        main = timeParam;
    }
    
    var setTimeParam = function( param ){
        if( !param || param.length < 8 ){
            var date = new Date();
            var timeH = date.getHours();
            var timeM = date.getMinutes();
            var timeS = date.getSeconds();
            if( timeH < 10 ){
                timeH = '0' + timeH;
            }
            if( timeM < 10 ){
                timeM = '0' + timeM;
            }
            if( timeS < 10 ){
                timeS = '0' + timeS;
            }
            return timeH + ':' + timeM + ':' + timeS;
        }

        return param;
    }

    var time_to_sec = function( timeclean ){
        var time = timeclean.split( ':' );
        var hour = time[0];
        var min = time[1];
        var sec = time[2];
        return ( ( ( hour * 60 ) + parseInt( min, 10 ) ) * 60 ) + parseInt( sec, 10 );
    }
    var sec_to_time = function( seconds ){
        if( seconds < 0 ){
            seconds = seconds * -1;
        }
        var minE = Math.floor( seconds / 60 );
        var hourE = Math.floor( minE / 60 );
        if( hourE < 10 ){
            hourE = '0' + hourE;
        }
        minE = minE%60;
        if( minE < 10 ){
            minE = '0' + minE;
        }
        var segE = seconds%60;
        if( segE < 10 ){
            segE = '0' + segE;
        }
        return hourE + ':' + minE + ':' + segE;
    }

    var clock = function(){
        if(interval != null){
            clearInterval( interval );
        }
        interval = setInterval(function(){
            if( main.timeInThePage === true && document.hasFocus() === true ){
                main.secondsInPage++;
                main.timeInPage = sec_to_time( main.secondsInPage );
            }
            var secTotal = time_to_sec( timeParam );
            if(main.decrement === false){
                secTotal = parseInt( secTotal + 1, 10 );
            }else{
                secTotal = parseInt( secTotal - 1, 10 );
            }

            if(secTotal < 0){
                secTotal = 0;
                clearInterval( interval );
            }
            
            if( main.just24 && secTotal >= seconds24 && main.decrement === false){
                secTotal = 0;
            }
            var timeText = sec_to_time( secTotal );
            timeParam = timeText;
            if( main.debug === true ){
                console.log( timeText );
            }
            if( typeof main.getTime == 'function' ){
                main.getTime( timeParam, secTotal, timeParam.split( ':' ), main );
            }
        }, 1000);
    }

    timeParam = setTimeParam( main.timeParam );
    delete main.timeParam;
    main.decrement = ( typeof main.decrement != 'undefined' && main.decrement != null ? main.decrement : false );
    main.just24 = ( typeof main.just24 != 'undefined' && main.just24 != null ? main.just24 : false );
    main.timeInThePage = ( typeof main.timeInThePage != 'undefined' && main.timeInThePage != null ? main.timeInThePage : false );
    main.getTime = ( typeof main.getTime == 'function' ? main.getTime : null );
    main.debug = ( typeof main.debug != 'undefined' && main.debug != null ? main.debug : false );
    main.timeSet = timeParam;
    main.timeActual = timeParam;
    main.secondsInPage = 0;
    main.timeInPage = 0;

    main.setTime = function( newtime ){
        timeParam = setTimeParam( newtime );
        main.timeActual = timeParam;
        return main;
    }
    main.addSeconds = function( seconds ){
        seconds = parseInt( seconds, 10 );
        timeParam = sec_to_time( time_to_sec( timeParam ) + ( !isNaN( seconds ) ? seconds : 0 ) );
        main.timeActual = timeParam;
        return main;
    }
    main.addMinutes = function( minutes ){
        minutes = parseInt( minutes, 10 );
        timeParam = sec_to_time( time_to_sec( timeParam ) + ( !isNaN( minutes ) ? ( parseInt( minutes, 10 )  * 60 ) : 0 ) );
        main.timeActual = timeParam;
        return main;
    }
    main.addHours = function( hours ){
        hours = parseInt( hours, 10 );
        timeParam = sec_to_time( time_to_sec( timeParam ) + ( !isNaN( hours ) ? ( parseInt( hours, 10 )  * 60 * 60 ) : 0 ) );
        main.timeActual = timeParam;
        return main;
    }
    main.subSeconds = function( seconds ){
        seconds = parseInt( seconds, 10 );
        timeParam = sec_to_time( time_to_sec( timeParam ) - ( !isNaN( seconds ) ? seconds : 0 ) );
        main.timeActual = timeParam;
        return main;
    }
    main.subMinutes = function( minutes ){
        minutes = parseInt( minutes, 10 );
        timeParam = sec_to_time( time_to_sec( timeParam ) - ( !isNaN( minutes ) ? ( parseInt( minutes, 10 )  * 60 ) : 0 ) );
        main.timeActual = timeParam;
        return main;
    }
    main.subHours = function( hours ){
        hours = parseInt( hours, 10 );
        timeParam = sec_to_time( time_to_sec( timeParam ) - ( !isNaN( hours ) ? ( parseInt( hours, 10 )  * 60 * 60 ) : 0 ) );
        main.timeActual = timeParam;
        return main;
    }
    main.start = function(){
        clock();
        return main;
    };
    main.restart = function(){
        main.timeActual = main.timeSet;
        timeParam = main.timeSet;
        clock();
        return main;
    };
    main.pause = function(){
        if( interval != null ){
            clearInterval( interval );
        }
        return main;
    };
    main.toArray = function(){
        return timeParam.split( ':' );
    };
    main.toSeconds = function(){
        return time_to_sec( timeParam );
    };
    main.toMinutes = function(){
        return Math.floor( parseInt(time_to_sec( timeParam ), 10) / 60 );
    };
    main.toHours = function(){
        return Math.floor( main.toMinutes() / 60 );
    };
    main.diffTime = function( time, reverse, origin ){
        if( !time || time.length < 8 || time.split(':').length != 3 ){
            return null;
        }
        var timeCompare = timeParam;
        if( origin === true ){
            timeCompare = main.timeSet;
        }
        if( reverse ){
            return sec_to_time( time_to_sec( time ) - time_to_sec( timeCompare ) ).replace('-', '');
        }
        return sec_to_time( time_to_sec( timeCompare ) - time_to_sec( time ) ).replace('-', '');
    }
    main.pretty = function(){
        var language = 'en-US';
        if(typeof navigator.browserLanguage != 'undefined'){
            language = navigator.browserLanguage;
        }else{
            language = navigator.language;
        }

        var horaText = 'hour';
        var minuteText = 'minute';
        var secondText = 'second';
        var and = 'and';
        if(language == 'pt-BR'){
            horaText = 'hora';
            minuteText = 'minuto';
            secondText = 'segundo';
            and = 'e';
        }
        var arrTime = timeParam.split( ':' );
        var hourText = ( arrTime[0] > 0 ? arrTime[0] + ' ' + ( arrTime[0] == 1 ? horaText : horaText + 's' ) : '' );
        var minutesText = ( arrTime[1] > 0 ? arrTime[1] + ' ' + ( arrTime[1] == 1 ? minuteText : minuteText + 's' ) : '' );
        var secondsText = ( arrTime[2] > 0 ? arrTime[2] + ' ' + ( arrTime[2] == 1 ? secondText : secondText + 's' ) : '' );
        return (hourText.length > 0 ? hourText + ( minutesText.length > 0 || secondsText.length > 0 ? ' ' + and + ' ' : '' ) : '' ) + (minutesText.length > 0 ? minutesText + ( secondsText.length > 0 ? ' ' + and + ' ' : '' ) : '' ) + secondsText;
    } 

    if(main.startParam === true){
        clock();
    }
    delete main.startParam;
    return main;
}
