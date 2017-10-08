'use strict';

var angular = require('angular');
var resume = angular.module('resume',[]);

resume.directive('overlay',function(){
    return{
        restrict:'E',
        template:'<div class="overlay"></div>',
        replace:true,
        link:function(scope,el,attr,ctrl){
            var overlay = el[0];
            window.addEventListener('load',function(){
              overlay.style.display = 'none';
            });
        }
    };
});

resume.directive('resumeContainer',['$http',function($http){
    return{
        restrict: "E",
        transclude: true,
        template: '<div class="wrapper clearfix">'+
        '<data-ng-transclude></data-ng-transclude>'+
        '</div>',
        require: "resumeContainer",
        controller: ['$scope',function($scope){

            /** PRIVATE DATA
             * Collection of data from the JSON.
             */
            var data = data || {};

            /** PRIVATE VALIDATE AND PROVIDE
             * Checks if the parameter requested exists in the DATA Returns an object with the requested parameter
             * @param {Object} - the JSON data  to be mapped.
             */
            var validateAndProvide = function(e){
                if(data.hasOwnProperty(e)){
                    var res = data[e];
                    return res;
                }else{
                    console.error("no property ",e);
                }
            };

            /** PUBLIC PARSE DATA
             * Maps all JSON data available to underneath directives.
             * @param {Object} - the JSON data  to be mapped.
             */
            this.parseData = function(datajson){
                for (var a in datajson){
                    for (var i in datajson[a]){
                        var key = Object.keys(datajson[a]);
                        data[key[0]] = datajson[a][i];
                    }
                }
                // console.log(data);
                $scope.$broadcast('data_parsed');
            };

            /** PUBLIC GET ATTRIBUTES
             * Returns an object with the parameters provided
             * @param {String} or {Object} - parameter or parameters requested.
             */
            this.getAttribute = function(prop){
                if(prop !== null && prop !== 'undefined')
                {
                    var res = res|| {};
                    if(typeof prop === "object")
                    {
                        for (var i in prop)
                        {
                            res[prop[i]] = validateAndProvide(prop[i]);
                        }
                        return res;
                    }
                    else if(typeof prop === "string")
                    {
                        res[prop] = validateAndProvide(prop);
                        return res;
                    }
                    else
                    {
                        console.error("string or object Expected, obtained: ",typeof prop);
                    }
                }
                else
                {
                    console.error("Invalid Argument in",this);
                }
            };
        }],
        link:function(scope,el,attr,resumeContainerCtrl){
            $http.get(attr.source).then(
                // success
                function(response){
                    var res = response.data.info;
                    resumeContainerCtrl.parseData(res);
                    scope.$broadcast('data_loaded',res);
                },
                // error
                function(){
                    console.error('no data');
                }
            );
        }
    };
}]);

resume.directive('containerLeft',function(){
    return{
        restrict: 'E',
        require: ['^resumeContainer','containerLeft'],
        replace: true,
        templateUrl: './src/templates/containerLeftTemplate.html',
        controller: ['$scope',function($scope){

            /** PUBLIC SET SCOPE
             * Maps json source to Scope
             * @param {Object} - the JSON data mapped as object from parent controller.
             */
            this.setScope = function(e){
                if( typeof e !== "undefined" && e !== null )
                {
                    for (var i in e)
                    {
                        $scope[i] = e[i];
                    }
                }
                else
                {
                    console.error("wrong bio!");
                }
            };
        }],
        link: function(scope,el,attr,ctrl){
            var resumeContainerCtrl = ctrl[0];
            var containerLeftCtrl   = ctrl[1];
            var func = resumeContainerCtrl.getAttribute;
            scope.$on('data_parsed',function(e,res){
                containerLeftCtrl.setScope(func(["contact","icons"]));
            });
        }
    };
});

resume.directive('containerRight',function(){
    return {
        restrict: 'E',
        require: ['^resumeContainer','containerRight'],
        replace: true,
        templateUrl: './src/templates/containerRightTemplate.html',
        controller: ['$scope',function($scope){
            this.setLocalScope = function(e){
                if( typeof e !== "undefined" && e !== null )
                {
                    for (var i in e)
                    {
                        $scope[i] = e[i];
                    }
                }
                else
                {
                    console.error("wrong bio!");
                }
            };
        }],
        link: function(scope,el,attr,ctrl){
            var resumeContainerCtrl = ctrl[0];
            var containerRightCtrl = ctrl[1];
            var func = resumeContainerCtrl.getAttribute;
            scope.$on('data_parsed',function(e,res){
                containerRightCtrl.setLocalScope(func(["about","xp","education","languages","techskills","certs","interests","trivia"]));
            });
        }
    };
});

resume.directive('collapsingContainer',['$http',function($http){
   return {
       restrict:"E",
       require:"collapsingContainer",
       controller:function(){
           var info = [];
           this.addItem = function(item){
               info.push(item);
           };

           this.data = this.data || {};
           this.maxItems = 0;
       },
       link:function(scope,el,attr,collapsingContainerCtrl){
        collapsingContainerCtrl.maxItems = attr.max;
       },
   };
}]);

resume.directive('collapsing-section',function(){
    return{
        restrict : "E",
        require : "^collapsingContainer",
        replace:true,
        templateUrl:"./src/templates/collapsingSectionTemplate.html",
        scope:{

        },
        controller:function($scope){
            $scope.$on('data-loaded',function(e,data){
               console.log('data available',data);
            });
        }
    };
});

resume.directive('levelIcons',function(){
    return{
        restrict:"E",
        require:"levelIcons",
        templateUrl: './src/templates/starExperienceTemplate.html',
        controller:['$scope',function($scope){
            this.getStars = function(num,ico){
                var stars = [];
                var pivot = num;
                var icon = ico;
                for (var i=0;i<5;i++){
                    stars.push( (i<pivot)? icon : icon+'-o' );
                }
                return stars;
            };
        }],
        link:function(scope,el,attr,ctrl){
            scope.quant = ctrl.getStars(attr.num,attr.icon);
        }
    };
});
