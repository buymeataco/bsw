<?php
@define("SERVERNAME", "localhost");
@define("USERNAME", "root");
@define("PASSWORD", "kissaliv");
@define("DATABASE", "facilityDirectory");
	$conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE);
	//mysql_set_charset('utf8', $conn);
		if (!$conn) {
			die("Uh-oh, the connection failed. That wansn't supposed to happen! Please email: thomas.rowley@baylorhealth.edu and let me know. Thanks!" . mysqli_connect_error());
		}
?>

<?php
$repeatOnce = [];

function conductSearch($queryLookup, $facility, $city, $zipcode, $zipradius) {

//not everything passed into the function was suitable for use in a query string, so I had to prep the values accordingly
global $conn, $resultCount;

$cityLookup = "'" . trim($city) . "'";
$zipLookup = "'" . trim($zipcode) . "'";

//grabs the cities array from its $_POST['city'] parent array
$cityPostArray[] = explode(", ", $city);
$cityPostArrayShifted = array_shift($cityPostArray);

//puts each value in single quotes and places it back in an array. trim() is needed to get rid of rogue spaces.
$citiesArray = [];
foreach ($cityPostArrayShifted as $value) {
	 $trimAndWrapEachCityInQuotes = "'" . trim($value) . "'";
	 array_push($citiesArray, $trimAndWrapEachCityInQuotes);
}

//converts cities back to a string with values wrapped in single quotes
$citiesLookupString = implode(",", $citiesArray);

switch($queryLookup) {
case '100':
//query by facility only - PASSED
	$query = "SELECT name, numAndStreet, suite, city, zip, phone, url, id FROM facilities WHERE visibility = 1 AND facility = '$facility' ORDER BY city ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 1</p>";
break;

case '110':
//query by facility & city - PASSED
	$query = "SELECT name, numAndStreet, suite, city, zip, phone, url, id FROM facilities WHERE visibility = 1 AND facility = '$facility' AND city = $cityLookup";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 2</p>";
break;

case '101':
//query by facility & zip - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND facility = '$facility' OR zip = $zipLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 3</p>";
break;

case '010':
//query by city only - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND city = $cityLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 4</p>";
break;

case '001':
//query by zipcode only - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND zip = $zipLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 5</p>";
break;

case '111':
//query by facility, city & zip - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND facility = '$facility' AND city = $cityLookup OR zip = $zipLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 6</p>";
break;

case '020':
//query by multiple cities only - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND city IN ($citiesLookupString) ORDER BY facility ASC, city ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 7</p>";
break;

case '120':
//query by mulitple cities & facility - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND city IN ($citiesLookupString) AND facility = '$facility' ORDER BY facility ASC, city ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 8</p>";
break;

case '011':
//query by city & zip - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND city = $cityLookup OR zip = $zipLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 9</p>";
break;

case '122':
//query by facility, mulitple cities & zip radius - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND facility = '$facility' AND city IN ($citiesLookupString) OR zip IN ($zipLookupString) ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 10</p>";
break;

case '022':
//query by multiple cities & zip radius - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND zip IN ($zipLookupString) OR city IN ($citiesLookupString) ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 11</p>";
break;

case '012':
//query by single city & zip radius - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND zip IN ($zipLookupString) OR city = $cityLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 12</p>";
break;

case '002':
//query by zip radius only - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND zip IN ($zipLookupString) ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 13</p>";
break;

case '112':
//query by facility, city & zip radius - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND facility = '$facility' AND city IN ($citiesLookupString) OR zip IN ($zipLookupString) ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 14</p>";
break;

case '121':
//query by facility, multiple city & zip - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND facility = '$facility' AND city IN ($citiesLookupString) OR zip = $zipLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 15</p>";
break;

case '021':
//query by multiple city & zip - PASSED
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND city IN ($citiesLookupString) OR zip = $zipLookup ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 16</p>";
break;

case '102':
//query by facility & zip radius - PASSED
	$getAPIInfo = file_get_contents("http://www.zipcodeapi.com/rest/YrUOJgLcsVAEclLV1TvPaoo6s4haCfiBGdqqubCW7cAkymfzgLoq9MwCRONu365K/radius.json/$zipcode/$zipradius/mile");
	$zipLookupString = getConvertedZipsforLookup($getAPIInfo);
	$query = "SELECT * FROM facilities WHERE visibility = 1 AND zip IN ($zipLookupString) OR facility = '$facility' ORDER BY facility ASC";
	$result = mysqli_query($conn,$query) or die ("<br />Could not execute a case " . $queryLookup . " query, see system administrator.");
	$resultCount = mysqli_num_rows($result);
	//echo "<p>case 17</p>";
break;
}
displayRowCount($resultCount);
displaySearchResults($result);
} // end conductSearch()

//grabs the zip codes from the JSON file and converts them into a usable form for a MySQL query
function getConvertedZipsforLookup($getAPIInfo) {
//converts the JSON data to a PHP array containing the zip codes
	$convertedJSONData = [];
	$convertToPHPArray = json_decode($getAPIInfo, TRUE);
	foreach($convertToPHPArray as $row) {
		foreach ($row as $pulledZip) {
			array_push($convertedJSONData, $pulledZip['zip_code']);
		}
	}
//puts each value in single quotes and places it back in an array. trim() needed to get rid of rogue spaces, converts zip codes back to a string with values wrapped in single quotes
$zipsArray = [];
	foreach ($convertedJSONData as $value) {
	 $trimAndWrapEachZipInQuotes = "'" . trim($value) . "'";
	 array_push($zipsArray, $trimAndWrapEachZipInQuotes);
	}
	$zipLookupString = implode(",", $zipsArray);
	return $zipLookupString;
} //end getConvertedZipsforLookup()

//for displaying the number of returned results
function displayRowCount($rows) {
	echo "<h1>Produced the following {$rows} results:</h1>";
}

//allows the facility type to display only when it changes, as opposed to being on every line
function displayFacility($addFacility) {
	global $repeatOnce;
	if (! in_array($addFacility, $repeatOnce)) {
		array_push($repeatOnce, $addFacility);
		return $addFacility;
	}
}

//displays the search results to the user
function displaySearchResults($result) {
$counter = 1;
while ($row = mysqli_fetch_array($result)) {
extract ($row);
$myFacilityType = (isset($facility)) ? $myFacilityType = $facility : $myFacilityType = "";
$myName = $name;
$myNumAndStreet = $numAndStreet;
$mySuite = $suite;
$myCity = $city;
$myZip = $zip;
$myPhone = $phone;
$myURL = $url;
//ternary operator alternates row colors on search results
$counter++;
$rowColor = ($counter & 1) ? $rowColor = 'resultDCDCDC' : $rowColor = 'resultC8DAE8';

$matches = NULL;
$getAddressForGoogleMaps = preg_match('/^\d*/', $myNumAndStreet, $matches);

echo
"<hr class=\"searchRule\" />
<h3 class=\"facilityType\">" . displayFacility($myFacilityType) . "</h3>
<div class={$rowColor}>
<ul class=\"resultList\">
	<li class=\"facilityName\">{$myName}</li>
	<li><a href=\"http://maps.google.com/maps?q={$myNumAndStreet}+{$myCity}+TX+{$myZip}\" target=\"self\">{$myNumAndStreet} {$mySuite}<br />
	{$myCity}, TX {$myZip}</a></li>
	<li class=\"phone\"> <a href=tel:{$myPhone}>{$myPhone}</a></li>
	<li class=\"url\"><a href=\"http://{$myURL}\" target=\"self\">{$myURL}</a></li>
</ul>
</div>";
} // end loop

//clean up scripts; clear all arrays, frees search results and closes the database connection
if (isset($repeatOnce, $getAPIInfo, $cityPostArray, $citiesArray)) { unset($repeatOnce, $getAPIInfo, $cityPostArray, $citiesArray); }
mysqli_free_result($result);
if (isset($conn)) { mysqli_close($conn); };
} // end displaySearchResults()

?>