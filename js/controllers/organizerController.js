/**
 * Created by barthclem on 7/6/17.
 */
'use strict';
angular.module('app').controller('OrganizerController', ['$location', 'OrganizerService', OrganizerController]);
function OrganizerController($location, organizerService) {
    let _this = this;

    _this.createOrganizer = function () {
        console.log('\n\n\nClicked on Create Organizer Button\n\n');
      organizerService.createOrganizer({organizername : _this.organizerName})
          .then(result => {
              if(result === 'success'){
                  console.log('\n\n\nCreated An Organizer\n\n');
                  $location.path('/events');
              }
              else{
                  console.log('Display a message indicating failure')
              }
          })
          .catch(error => {
              console.log(`\n\nThere was a case of Error => ${JSON.stringify(error)}`);
          })
    };
}
