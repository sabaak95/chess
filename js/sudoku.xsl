<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">


<xsl:template match="/">


<html>


<body>


<div id="sudoku">


<table>

<xsl:apply-templates/>

</table>

</div>

<div id="check-sudoku">Check it Out!</div>

<div id="submit-sudoku">Submit</div>

</body>

</html>

</xsl:template>


<xsl:template match="row">


<tr>

<xsl:apply-templates/>

</tr>

</xsl:template>


<xsl:template match="cell">


<td>

<xsl:value-of select="."/>

</td>

</xsl:template>

</xsl:stylesheet>