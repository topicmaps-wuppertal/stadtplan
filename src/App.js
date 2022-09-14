import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MappingConstants } from "react-cismap";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";

import convertItemToFeature from "./helper/convertItemToFeature";
import { getFeatureStyler, getPoiClusterIconCreatorFunction } from "./helper/styler";
import Stadtplankarte from "./Stadtplankarte";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-cismap/topicMaps.css";
import { getPOIColors } from "./helper/helper";
import itemFilterFunction from "./helper/filter";
import titleFactory from "./helper/titleFactory";
import createItemsDictionary from "./helper/createItemsDistionary";

function App() {
  const [poiColors, setPoiColors] = useState();

  useEffect(() => {
    getPOIColors(setPoiColors);
    document.title = "Online-Stadtplan Wuppertal";
  }, []);
  if (poiColors) {
    return (
      <TopicMapContextProvider
        appKey='OnlineStadtplanWuppertal2022'
        featureItemsURL={"https://wupp-topicmaps-data.cismet.de/data/poi.data.json"}
        createFeatureItemsDictionary={createItemsDictionary}
        getFeatureStyler={getFeatureStyler}
        convertItemToFeature={convertItemToFeature}
        itemFilterFunction={itemFilterFunction}
        titleFactory={titleFactory}
        referenceSystemDefinition={MappingConstants.proj4crs25832def}
        clusteringOptions={{
          iconCreateFunction: getPoiClusterIconCreatorFunction({ svgSize: 35, poiColors }),
        }}
        mapEPSGCode='25832'
        referenceSystem={MappingConstants.crs25832}
        additionalStylingInfo={{ poiColors }}
      >
        <Stadtplankarte poiColors={poiColors} />
      </TopicMapContextProvider>
    );
  } else {
    return <div>loading</div>;
  }
}

export default App;
