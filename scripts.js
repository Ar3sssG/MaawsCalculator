'use strict'
        function CalculateDistance(playerX, playerY, targetX, targetY) {
            let xDiff = playerX - targetX;
            let yDiff = playerY - targetY;

            let distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
            distance = Math.round(distance);
            return distance;
        }

        function CalculateHorizontalRange(distance, azimuth = 0) {
            return distance * Math.cos(azimuth);
        }

        function CalculateFlightTime(horizontalRange, projectileSpeed = 750) {
            return horizontalRange / projectileSpeed;
        }

        function CalculateVerticalRange(flightTime, playerHeight, targetHeight, gravityForce = 9.81) {
            let verticalRange = (0.5 * gravityForce * (flightTime ** 2)) + (targetHeight - playerHeight);
            return verticalRange;
        }

        function CalculateElevation(verticalRange, horizontalRange) {
            return Math.atan(verticalRange / horizontalRange);
        }

        function ConvertDegreesToMils(degree) {
            return degree * 6400 / 360;
        }

        function CalculateDistanceValue(){
            let playerX = parseFloat(document.getElementById("playerX").value);
            let playerY = parseFloat(document.getElementById("playerY").value);
            let targetX = parseFloat(document.getElementById("targetX").value);
            let targetY = parseFloat(document.getElementById("targetY").value);

            if(!isNaN(playerX) && !isNaN(playerY) && !isNaN(targetX) && !isNaN(targetY)) {
                let distance = CalculateDistance(playerX, playerY, targetX, targetY);
                document.getElementById("distanceResult").value = distance;
                document.getElementById("targetDistance").value = distance;
            }

            return;
        }

        function CalculateElevationAndETA() {
            let targetDistance = parseFloat(document.getElementById("targetDistance").value);
            let azimuth = parseFloat(document.getElementById("azimuth").value);

            let horizontalRange = CalculateHorizontalRange(targetDistance, azimuth);
            let flightTime = CalculateFlightTime(horizontalRange);
            let verticalRange = CalculateVerticalRange(flightTime, playerHeight, targetHeight);
            let elevation = CalculateElevation(verticalRange, horizontalRange);
            let elevationInMils = ConvertDegreesToMils(elevation);
            document.getElementById("elevationResult").innerText = elevationInMils;
        }