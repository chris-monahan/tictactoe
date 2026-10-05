const config = {
    board:{
        sizeX:3,
        sizeY:3,
        noughtColor:"rgb(20, 70, 220)",
        crossColor:"rgb(220, 40, 20)",
        //How much of the space available the board may take up (0.85 = 85%). Its width share is
        //narrowWidthShare on windows narrowScreenWidth px wide or less, wideWidthShare on windows
        //wideScreenWidth px wide or more, and slides evenly between the two in between.
        sizing:{
            narrowScreenWidth:500,
            narrowWidthShare:0.85,
            wideScreenWidth:1000,
            wideWidthShare:0.75,
            heightShare:0.75
        }
    },
    sidebar:{
        enabled:true,
        components:['history'],
        //The text written down the tab that opens the sidebar
        tabLabel:'History',
    }
}

export default config;
