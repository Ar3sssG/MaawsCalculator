'use strict'
function CalculateDistance(playerX, playerY, targetX, targetY) {
    let xDiff = targetX - playerX;
    let yDiff = targetY - playerY;

    let distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    distance = distance * 100;
    distance = distance.toFixed(4);
    distance = Math.ceil(distance);
    return distance;
}

function CalculateHorizontalRange(distance, azimuth) {
    return (distance * Math.cos((azimuth * Math.PI) / 180)).toFixed(4);
}

function CalculateFlightTime(horizontalRange, projectileSpeed = 750) {
    return horizontalRange / projectileSpeed;
}

function CalculateVerticalRange(flightTime, playerHeight, targetHeight, gravityForce = 9.81) {
    let sqrFlightTime = flightTime ** 2;

    let verticalRange = (0.5 * gravityForce * sqrFlightTime) + (targetHeight - playerHeight);
    return verticalRange;
}

function CalculateElevation(verticalRange, horizontalRange) {
    return Math.atan((verticalRange / horizontalRange) * 180 / Math.PI);//***********
}

function ConvertDegreesToMils(degree) {
    return degree * 6400 / 360;
}

function CalculateDistanceValue() {
    let playerX = parseFloat(document.getElementById("playerX").value);
    let playerY = parseFloat(document.getElementById("playerY").value);
    let targetX = parseFloat(document.getElementById("targetX").value);
    let targetY = parseFloat(document.getElementById("targetY").value);

    if (!isNaN(playerX) && !isNaN(playerY) && !isNaN(targetX) && !isNaN(targetY)) {
        let distance = CalculateDistance(playerX, playerY, targetX, targetY);
        document.getElementById("distanceResult").value = distance;
        document.getElementById("targetDistance").value = distance;
    }

    return;
}

function CalculateElevationAndETA() {
    let targetDistance = parseFloat(document.getElementById("targetDistance").value);
    let azimuth = Number(document.getElementById("azimuth").value);
    let playerHeight = parseFloat(document.getElementById("playerHeight").value);
    let targetHeight = parseFloat(document.getElementById("targetHeight").value);

    if (!isNaN(targetDistance) && !isNaN(playerHeight) && !isNaN(targetHeight)) {
        let horizontalRange = CalculateHorizontalRange(targetDistance, azimuth);
        let flightTime = CalculateFlightTime(horizontalRange);
        let verticalRange = CalculateVerticalRange(flightTime, playerHeight, targetHeight);
        let elevation = CalculateElevation(verticalRange, horizontalRange);
        let elevationInMils = ConvertDegreesToMils(elevation);

        document.getElementById("elevationResult").value = Math.abs(elevationInMils).toFixed(2);
        document.getElementById("etaResult").value = flightTime.toFixed(2);
    }

    return;

}