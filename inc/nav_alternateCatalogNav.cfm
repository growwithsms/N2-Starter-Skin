<!--- Use this file to make your own sidebar. Delete this file to use the default N2 sidebar --->

<cfset curCatalogID = SESSION.catalog.defaultView >
<cfset curSCID = SESSION.catalog.defaultScID >
<CFINVOKE COMPONENT="#request.cfcMapping#.category" returnvariable="categoryAll2" METHOD="categoryInfo" catalogID="#curCatalogID#" scID="#curSCID#"></CFINVOKE>
<cfquery name="categoryList" dbtype="query">
	select * from categoryAll2
	where catIDParent = 0
</cfquery>
<cfset currentCatalogID = 0>
<cfif isdefined("session.category.in")>
	<cfset currentCatalogID = decodeID(SESSION.category.In)>
</cfif>	
<cfif 1 EQ 0>
	<CFINVOKE COMPONENT="#request.cfcMapping#.navigation" METHOD="standardLeftNav" 
		categoryList ="#categoryList#" scID ="#curSCID#" 
		catID="#currentCatalogID#" showAccuform="Yes" accuformCatMask="Signs" linkHeader="Yes">
	</CFINVOKE>
<cfelse>
	<cfset levelsToReturn = 2>
	<cfquery name="hiddenCategories" datasource="#request.datasource#">
		SELECT catID
		FROM	xCategoryHide
		WHERE	scID = #curSCID#
	</cfquery>
	<cfset hideCats = listappend(valuelist(hiddenCategories.catID),0)>
	<cfquery name="catInfo" datasource="#request.datasource#">
		SELECT 	category.catID, category.catIDparent, category.catIDtop, category.catName, category.catFullSort, category.catImage,	category.catURL, category.catIndent, category.catStatus, category.catAltTag
		FROM category
		WHERE catalogID=#val(curCatalogID)#
			AND	(scID=0 OR scID=#curSCID#)
			AND	NOT catID IN (#hideCats#)
			AND	catIndent<#levelsToReturn#
		ORDER BY catFullSort
	</cfquery>
	<ul class="catelog-navigation">
		<cfoutput query="catInfo">
				
			<!--- Sets the correct link depending on if it's a product page, static page or category page --->
			<cfif len(trim(catInfo.catURL))>
				<cfset newCatLink = catInfo.catURL>
			<cfelseif catInfo.catStatus is 2 or catInfo.catStatus is 0>
				<cfset newCatLink = "#request.linkto#store/productList.cfm?catID=#encodeID(catInfo.catID)#">
			<cfelse>
				<cfset newCatLink = "#request.linkto#store/categoryList.cfm?catID=#encodeID(catInfo.catID)#">
			</cfif>

			<!--- Variables for Outputting to page below --->
			<cfset catIdParent = "#catInfo.catIdParent#">
			<cfset catIdTop = "#catInfo.catIdTop#">
			<cfset catId = "#catInfo.catId#">
			<cfset catName = "#catInfo.catName#">

			<!--- First Level --->
			<cfif catIdParent EQUAL 0>
				<li id="#catId#" class="menu-item-depth-1">
					<a id="nav_#catInfo.catID#" href="#newCatLink#"><cfset t.dt("#catInfo.catName#","all")></a>
				</li>
			</cfif>

			<!--- Second Level 
				Stefen's TODO: move second level inside of <li> in first level rather than using javascript to do this.  My Coldfusion Skills are lacking...
			
			<cfif catIdTop NOT EQUAL catId>
				<li class="menu-item-depth-2 #catIdParent#" data-parent="#catIdParent#">
					<a id="nav_#catInfo.catID#" href="#newCatLink#"><cfset t.dt("#catInfo.catName#","all")></a>
				</li>
			</cfif>--->

		</cfoutput>
	</ul>
</cfif>

