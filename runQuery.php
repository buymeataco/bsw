<!-- This script assembles the three digit code used for the query lookup in runQuery.php. The unprepped user-defined parameters are sent to the next script where they're perpared for use in the query lookup. -->

<?php include('queryScripts.php'); ?>

<?php
// gets an accurate city count. If the user selects one or no cities, count() and sizeof() will both still return 1. So, you have to check to see if the first key actually has a value to determine if the user selected a city.
  $cityExplode[] = explode(",", $_POST["city"]);
  $cityData = array_shift($cityExplode);
  $cityDataCount = count($cityData);
  if (empty($cityData[0])) {
    $adjustedCityDataCount = $cityDataCount - 1;
  } else {
    $adjustedCityDataCount = $cityDataCount;
  }

// sets the cityChoice according to what the user specified
if ($adjustedCityDataCount == 0) {
  $cityParameter = 0;
}
if ($adjustedCityDataCount == 1) {
  $cityParameter = 1;
}
if ($adjustedCityDataCount > 1) {
  $cityParameter = 2;
}

// sets the facilityChoice according to what the user specified
if ($_POST['facility'] != "0") {
  $facilityParameter = 1;
} else {
  $facilityParameter = 0;
}

// sets the zipChoice according to what the user specified
if ($_POST['zipradius'] == 1) {
  if ($_POST['zipcode'] != 0) {
    $zipcodeParameter = 1;
  } else {
    $zipcodeParameter = 0;
  }
} elseif ($_POST['zipradius'] > 1) {
  if ($_POST['zipcode'] != 0) {
    $zipcodeParameter = 2;
  } else {
    $zipcodeParameter = 0;
  }
}
 //lookup and perform the query
$queryLookup = $facilityParameter . $cityParameter . $zipcodeParameter;
conductSearch($queryLookup, $_POST['facility'], $_POST['city'], $_POST['zipcode'], $_POST['zipradius']);
?>