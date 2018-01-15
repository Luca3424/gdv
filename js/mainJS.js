function init() {
    setData(); //load maps
    loadTableau16();
    loadTableau23();
}

function loadTableau16(){
    var placeholderDiv = document.getElementById("overview_16");
    var url = "https://public.tableau.com/views/Tagesablauf16/Blatt1?:embed=y&:display_count=yes";
    var options = {
        hideTabs: true,
        onFirstInteractive: function () {}
    };
    var viz = new tableau.Viz(placeholderDiv, url, options);
}

function loadTableau23(){
    var placeholderDiv = document.getElementById("overview_23");
    var url = "https://public.tableau.com/views/Tagesablauf/23_12_2017?:embed=y&:display_count=yes";
    var options = {
        hideTabs: true,
        onFirstInteractive: function () {}
    };
    var viz = new tableau.Viz(placeholderDiv, url, options);
}