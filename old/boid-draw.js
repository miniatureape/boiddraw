window.addEvent('domready', function(){
    init();    
})

var canvas = null;

function init(){
    var c = $('canvas');
    var b = $('osb');
    this.canvas = new Canvas({canvas:c, osb:b});
    setupForm();
    main();
}

function setupForm(){
    var nbSelect = $('numboids');
    var boidcolors = $('boidcolors');
    nbSelect.addEvent('change', function(event){
        var val = Number(event.target.value);
        this.canvas.numboids = val;
        updateColorOptions(boidcolors, val);
    }.bind(this));
    updateColorOptions(boidcolors, nbSelect.value);
    
    var forceSelect = $('boidforce');
    forceSelect.addEvent('change', function(event){
        var val = Number(event.target.value);
        this.canvas.maxForce = val;
    }.bind(this));
    
    var speedSelect = $('boidspeed');
    speedSelect.addEvent('change', function(event){
        var val = Number(event.target.value);
        this.canvas.maxSpeed = val;
    }.bind(this));
}

function updateColorOptions(parent, val){
    parent.empty();
    var num = parent.getChildren().length;
    for(var i = 0; i < val-num; i++){
        createBoidColorPicker(parent);
    }
}

function createBoidColorPicker(parent){
    var colors = {
        '#666666':'Gray',
        '#300018':'Purple',
        '#5A3D31':'Brown',
        '#837B47':'Olive',
        '#ADB85F':'Pale Green',
        '#E5EDB8':'Ivory',
        '#0FC3E8':'Light Blue',
        '#0194BE':'Blue',
        '#E2D397':'Beige',
        '#F07E13':'Squash',
        '#481800':'Different Brown'        
    };
    var div = new Element('div',{class: "colorpicker"});
    div.html = "Boid Color:";
    var sel = new Element('select');
    $each(colors, function(item, index){
        var opt = new Element('option',{'value':index});        
        opt.text = item;
        opt.setStyle('background-color', index);
        opt.inject(sel);
    })
    sel.inject(div);
    div.inject(parent);    
}

function checkRemoveBoid(item, index){
    if(index > num -1){
        item.dispose;
    }
}

function main(){
    canvas.render();
    setTimeout('main()', 30);
}