<!--- Use this file for adding extra things to the Home Page --->
<div class="line-card-box-wrapper">
	<div class="featuredProductsTitle">
		<span>Product Lines</span>
	</div>
<cfquery name="mfgs" datasource="#request.datasource#">
	SELECT distinct(mfg.mfgID), mfgName, mfgURL, mfgLogo
	FROM mfg
		INNER JOIN product ON mfg.mfgID=product.mfgID
		INNER JOIN xProductCategory ON product.pID=xProductCategory.pID
		INNER JOIN category ON xProductCategory.catID=category.catID
	WHERE
		((xProductCategory.scID=0 AND category.catalogID=#session.catalog.view#) OR xProductCategory.scID=#session.catalog.scID#)
	ORDER BY MFGName
</cfquery>
	<div class="line-card-box">
		<cfoutput query="mfgs">
			<cfif NOT fileExists("#request.offServerStorage#mfg\thumbs\#mfgs.mfgLogo#")>
				<CFINVOKE COMPONENT="#request.cfcMapping#.mfg" METHOD="generateMFGPic" 
					mfgID="#mfgs.mfgID#"></CFINVOKE>
			</cfif>
			<cfif fileExists("#request.offServerStorage#mfg\thumbs\#mfgs.mfgLogo#")>
				<cfimage source="#request.offServerStorage#mfg\thumbs\#mfgs.mfgLogo#" action="info" structname="imgInfo">  
				<cfset newTopMargin = (66- imgInfo.height) / 2>
				<cfif mfgs.mfgID neq 593>
					<a id="lc#mfgs.mfgID#" href="#request.linkto#store/search_results.cfm?searchKeyword=#URLEncodedFormat(mfgs.mfgName)#&mOnly=1"><img src="#request.linkto#files/mfg/thumbs/#URLEncodedFormat(mfgs.mfgLogo)#" alt="#mfgs.mfgLogo#"></a>
				</cfif>
			</cfif>
		</cfoutput>
	</div>
</div>