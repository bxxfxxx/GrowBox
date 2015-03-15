var growboxFilters = angular.module('growboxFilters', []);
growboxFilters.filter('mesure', function () {
    return function( input ){
        var value = input.value;
        var isMoreThanOne = parseFloat( value ) > 1;
        value = value.replace("/", " à ");

        var mesure = input.mesure;
        if( mesure === "hour" ){
            mesure = "heure" + ( isMoreThanOne ? "s" : "" ); 
        }else if( mesure === "percent"){
            mesure = "%";
        }else if( mesure === "celsius" ){
            mesure = "°";
        }else if( mesure === "lumen" ){
            mesure = "lumens";
        }else if( mesure === "day" ){
            mesure = "jour"+ ( isMoreThanOne ? "s" : "" ); 
        }
        return ( value + " " + mesure );
    };
});