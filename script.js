//izbor opcije
tree();
d3.select(".options").on("change",function(){
    d3.select('svg').remove();
    if(this.value=="H2H")H2H();
    else if(this.value=="Best")bestYear();
    else if(this.value=="Grand_Slams")bubble();
    else if(this.value=="stats")statistika();
    else tree();
})

//bubble chart--------------------------------------------------------------------------------------
function bubble(){
const canvas = d3.select(".main");


const svg = canvas.append("svg");
svg.append("image").attr("width",100).attr("height",100).attr("x",50).attr("y",30)
    .attr("href","img/slams.png");
svg.attr("width","1100")
    .attr("height","600")
    .attr("style","border : 3px #112a35 solid")
    .style('background-image','url(img/podium.jpg)')
    .style('background-repeat','no-repeat')
    .style('background-size','cover')
    .style("background-color","rgba(255,255,255,0.2)")
    .style("background-blend-mode","lighten");

    
var graph = {
    nodes : [
        {name : "AU1", radius : 20, img: "img/au.png"},
        {name : "AU2",radius : 25,img: "img/au.png"},
        {name : "W1",radius : 25,img: "img/w.png"},
        {name : "US1",radius : 24,img: "img/us.jpg"},
        {name : "AU3",radius : 30,img: "img/au.png"},
        {name : "AU4",radius : 15,img: "img/au.png"},
        {name : "W2",radius : 16,img: "img/w.png"},
        {name : "AU5",radius : 31,img: "img/au.png"},
        {name : "W3",radius : 35,img: "img/w.png"},
        {name : "US2",radius : 40,img: "img/us.jpg"},
        {name : "AU6",radius : 33,img: "img/au.png"},
        {name : "RG1",radius : 41,img: "img/rg.jpg"},
        {name : "W4",radius : 38,img: "img/w.png"},
        {name : "US3",radius : 34,img: "img/us.jpg"},
        {name : "AU7",radius : 42,img: "img/au.png"},
        {name : "W5",radius : 36,img: "img/w.png"},
        {name : "AU8",radius : 29,img: "img/au.png"},
        {name : "AU9",radius : 31,img: "img/au.png"},
        {name : "RG2",radius : 32,img: "img/rg.jpg"},
        {name : "W6",radius : 43,img: "img/w.png"},
        {name : "W7",radius : 34,img: "img/w.png"},
        {name : "AU10",radius : 48,img: "img/au.png"},
    ],
    links : [
        {source :"AU1",target : "AU2"},
        {source :"AU2",target : "W1"},
        {source :"W1",target : "US1"},
        {source :"US1",target : "AU3"},
        {source :"AU3",target : "AU4"},
        {source :"AU4",target : "W2"},
        {source :"W2",target : "AU5"},
        {source :"AU5",target : "W3"},
        {source :"W3",target : "US2"},
        {source :"US2",target : "AU6"},
        {source :"AU6",target : "RG1"},
        {source :"RG1",target : "W4"},
        {source :"W4",target : "US3"},
        {source :"US3",target : "AU7"},
        {source :"AU7",target : "W5"},
        {source :"W5",target : "AU8"},
        {source :"AU8",target : "AU9"},
        {source :"AU9",target : "RG2"},
        {source :"RG2",target : "W6"},
        {source :"W6",target : "W7"},
        {source :"W7",target : "AU10"},
    ]
};

var slike=["img/au.png","img/rg.jpg","img/us.jpg","img/w.png"]
const paterni=svg.selectAll('defs')
                 .data(slike)
                 .enter()
                 .append('defs')
                 .append('pattern')
                 .attr('id',function(d,i){
                    return d;
                })
                 .attr('height','100%')
                 .attr('width','100%')
                 .attr('patternContentUnits','objectBoundingBox')
                 .append('image')
                 .attr('height','1')
                 .attr('width','1')
                 .attr('preserveAspectRatio','none')
                 .attr('xlink:href',function(d,i){
                    return d;
                })




var simulation = d3
                    .forceSimulation(graph.nodes)
                    //.force ("link",d3.forceLink(graph.links).id(function(d){
                      //  return d.name;
                    //})
                    //)
                    .force("charge",d3.forceManyBody().strength(300))
                    .force("center",d3.forceCenter(1100/2,600/2))
                    .force("collide",d3.forceCollide(function(d){
                        return d.radius;
                    }).strength(0.7))
                    .on("tick",ticked);

var link = svg.append("g")
                .selectAll("line")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("stroke-width",function(d){
                    return 3;
                })
                .style("stroke","yellow");

var node = svg.append("g")
                .selectAll("circle")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .attr("r",function(d){
                    return d.radius;
                })
                .attr('fill',function(d){
                    return "url(#"+d.img+")";
                })
                .attr("stroke","#112a35");



function ticked(){
    link.attr("x1",function(d){
        return d.source.x;
    })
        .attr("y1",function(d){
            return d.source.y;
        })
        .attr("x2",function(d){
            return d.target.x;
        })
        .attr("y2",function(d){
            return d.target.y;
        });

    node.attr("cx",function(d){
        return d.x;
    })
        .attr("cy",function(d){
            return d.y;
        });
 }



}
//------------------------------------------------------------------------------------------------------
//Head2Head-----------------------------------------------------------------------------------
function H2H(){
//data za igrace
const igraci=[
    {name:'rafa',record:'30-29'},
    {name:'fede',record:'27-23'},
    {name:'murray',record:'25-11'},
    {name:'stan',record:'20-6'},
];
const mySvg=d3.select('.main')
                            .append('svg')
                            .attr('width',1100)
                            .attr('height',600)
                            .attr("style","border : 3px #112a35 solid")
                            .style('background-image','url(img/h2h.JPG)')
                            .style('background-repeat','no-repeat')
                            .style('background-size','cover')
                            
//dodavanje loptica
const loptice=mySvg.selectAll('image')
                    .data(igraci)
                    .enter()
                    .append('image').classed('lopta',true)
                    .attr('href',"img/1.png")
                    .attr('width',180)
                    .attr('height',180)
                    .attr('x',function(d,i){
                        if(i==0)return 120;
                        return i*250+120;
                    })
                    .attr('y',-200)
//dodavanje igrica i teksta
mySvg.selectAll('g').data(igraci)
                        .enter()
                        .append('g').style('opacity',0)
                        .append('image').classed('igraci',true)
                        .attr('href',function(d){
                            return 'img/'+d.name+'.png';
                        })
                        .attr('width',280)
                        .attr('height',280)
                        .attr('x',function(d,i){
                        if(i==0)return 45;
                        return i*250+45;
                        })
                        .attr('y',160)
                        .select(function(){
                            return this.parentNode;
                        })
                        .append('text')
                        .attr('x',function(d,i){
                            if(i==0)return 165;
                            return i*250+165;
                        })
                        .attr('y',522)
                        .attr('font-size',40)
                        .attr('font-weight',800)
                        .attr('fill','#black')
                        .text(function(d,i){
                            return d.record;
                        })
                        .select(function(){
                            return this.parentNode;
                        })
                        .append('text')
                        .attr('x',function(d,i){
                            if(i==0)return 165;
                            if(i==3)return i*250+100;
                            return i*250+165;
                        })
                        .attr('y',120)
                        .attr('font-size',40)
                        .attr('font-weight',800)
                        .attr('fill','black')
                        .text(function(d,i){
                            if(i==0)return "Nadal";
                            else if(i==1) return "Rodger"
                            else if(i==2)return "Andy"
                            else return "Wawrinka"
                        })
//animacije
animation();
function animation(){
    d3.selectAll('.lopta').transition()
                               .ease(d3.easeBounce)
                               .duration(4000)
                               .attr('y',420)
                               .delay(function(d,i){
                                return i*1100;
                               })
    d3.selectAll('g').transition()
                           .ease(d3.easeLinear)
                           .duration(1200)
                           .style('opacity',1)
                           .delay(function(d,i){
                           return i*1100+3700;

    })
}

}
//---------------------------------------------------------------------------------------

//Best year---------------------------------------------------------------------------------
function bestYear(){

const width=1100;
const height=600;
var mySvg=d3.select('.main')
                            .append('svg')
                            .attr('width',width)
                            .attr('height',height)
                            // .style('background-image','url(img/bestYear.jpg)')
                            // .style('background-repeat','no-repeat')
                            // .style('background-size','cover')
//data
const atp=[
    {player:"Novak",
    points:[2045,2345,4385,5385,6385,7585,9585,11785,13785,15285,16585]
    ,rank:[1,1,1,1,1,1,1,1,1,1,1]},
    {player:"Rafa",
    points:[360,790,1015,1420,2200,2810,3355,3625,3715,4675,5230]
    ,rank:[4,5,5,5,4,5,5,5,5,5,5]},
    {player:"Federer",
    points:[340,840,1440,1780,2390,3250,4450,5450,6665,7175,8265]
    ,rank:[5,4,4,3,3,4,4,3,3,3,3]},
    {player:"Murray",
    points:[1200,1380,2420,2670,3760,4980,5830,7190,7510,7870,8945]
    ,rank:[2,3,2,2,2,2,2,2,2,2,2]},
    {player:"Wawrinka",
    points:[970,1515,1570,1660,2145,4190,4550,4740,5510,6190,6900]
    ,rank:[3,2,3,4,5,3,3,4,4,4,4]},
]
//x-osa
var x=d3.scaleLinear().domain([0,d3.max(atp[0].points)])
                      .range([30,width-30]);
var xOsa=d3.axisBottom(x);
mySvg.append('g')
     .attr('transform',function(){
        return "translate(0,"+(height-25)+")";
     })
     .call(xOsa)
     .selectAll('text').attr("font-size",15);
//y-osa
var y=d3.scaleLinear().domain([atp.length+1,0])
                      .range([height-30,0]);

var yOsa=d3.axisLeft(y).tickValues([1,2,3,4,5]).ticks(0,"d").tickSize(1);

mySvg.append('g')
      .attr('transform',function(){
        return "translate("+30+",5)";
       })
     .call(yOsa)
     .selectAll('text').attr("font-size",15);

mySvg.append('g').append('text').text('ATP RANK').attr('x',35).attr('y',20)
    .select(function(){return this.parentNode})
    .append('text').text('ATP POINTS').attr('x',width-100).attr('y',height-35);

//barovi i slike
const heightB=65;
var bars=mySvg.selectAll('rect').data(atp).enter()
              .append('rect')
              .attr('x',30)
              .attr('y',function(d,i){
                return y(i+1)-(heightB/2-5);
              })
              .attr('width',0)
              .attr('height',heightB)
              .attr('fill','#279dd3')

var pic=mySvg.selectAll('image').data(atp).enter()
             .append('image').classed('slike',true)
             .attr('href',function(d,i){
                return 'img/'+atp[i].player+'.jpg';
             })
             .attr('height',heightB-10)
             .attr('width',heightB-10)
             .attr('x',0)
             .attr('y',function(d,i){
                 return y(i+1)-(heightB/2-5);
             })
             .style('opacity',0);
//tekst za mesec           
var month=["January", "February", "March", "April", "May", "June", "July",
             " August","September"," October"," November"];
mySvg.append('text').classed('mesec',true)
                  .attr('x',width-300)
                  .attr('y',height-150)
                  .style('font-size',40);


var j=0;
xyText();
var timer=d3.interval(animation,2120);
//animacije

function xyText(){
    mySvg.selectAll('g').transition()
         .ease(d3.easeLinear).duration(2000).attr('opacity',1);
}
function animation(){
    mySvg.selectAll('rect').transition()
    .ease(d3.easeLinear)
    .duration(2100)
    .attr('width',function(d,i){
     return x(d.points[j])-30;
    })
    .attr('y',function(d,i){
        return y(d.rank[j])-(heightB/2-5);
      })

    mySvg.selectAll(".slike").transition()
    .ease(d3.easeLinear)
    .duration(2100)
    .attr('y',function(d,i){
        return y(d.rank[j])-(heightB/4)-6;
      })
    .attr('x',function(d,i){
        return x(d.points[j])-30-(heightB/2);
    })
    .style('opacity',1);
    mySvg.select('.mesec').text(function(){
        return month[j]+'  2015';
    })
    j++;
    if(j==11)timer.stop();
}
}
//----------------------------------------------------------------------------------------------------

//tree------------------------------------------------------------------------------------------------
function tree(){
    const canvas = d3.select(".main")
            
const svg = canvas.append("svg");
svg.attr("width","1100")
    .attr("height","600")
    .attr("style","border : 3px #112a35 solid")
    .style("background-color","#d6ecf3")
    .append("g").attr("transform","translate(50,50)");
    

var data = [{"child":"Srdjan", "parent":"", "sprouse":"Dijana"},
            {"child":"Novak", "parent":"Srdjan","sprouse":"Jelena"},
            {"child":"Stefan", "parent":"Novak"},
            {"child":"Tara", "parent":"Novak"},
            {"child":"Marko", "parent":"Srdjan"},
            {"child":"Djordje", "parent":"Srdjan"}
];
d3.select("svg")
    .style("opacity", 0)
    .transition().duration(1000).style("opacity", 1);
//slicica
svg.append("image").attr("width",300).attr("height",300).attr("x",1100-250).attr("y",600-200)
    .attr("href","img/dna1.png");
svg.append("image").attr("width",300).attr("height",300).attr("x",1100-450).attr("y",600-300)
    .attr("href","img/famm.png");
var dataStructure = d3.stratify()
                       .id(function(d){
                        return d.child;
                       })
                        .parentId(function(d){
                            return d.parent;
                       })
                       (data);

var treeStructure = d3.tree().size([1000,400]);
var information = treeStructure(dataStructure);

var rodbinskeVeze = svg.append("g").selectAll("path")
        .data(information.links());

rodbinskeVeze.enter().append("path")
             .attr("d", function(d){
            return "M" + (d.source.x-20) + "," + (d.source.y+30) + "h 60 v 60 H" +
            (d.target.x-20) + " V " + (d.target.y+10);
        })
           .attr("fill","none")
           .attr("stroke","black")
           .attr("stroke-width","3px");

// dodato zbog brakova - za povratnu horizonatalnu

var rodbinskeVeze2 = svg.append("g").selectAll("path")
           .data(information.links());
   
rodbinskeVeze2.enter().append("path")
               .attr("d", function(d){
               return "M" + (d.source.x+40) + "," + (d.source.y+30) + "h 40 ";
           })
              .attr("fill","none")
              .attr("stroke","black ")
              .attr("stroke-width","3px");

var pravougaonici = svg.append("g").selectAll("rect")
                  .data(information.descendants());
pravougaonici.enter().append("rect")
        .attr("x",function(d){
            return d.x-60;
        })
        .attr("y",function(d){
            return d.y+10;
        })
        .attr("fill","white")
        .attr("stroke","black ")
        .attr("stroke-width","3px")
        .attr("width","80")
        .attr("height","40");

var brakPravougaonici = svg.append("g").selectAll("rect")
                            .data(information.descendants());
brakPravougaonici.enter().append("rect")
                 .attr("x",function(d){
                     return d.x+50;
                  })
                  .attr("y",function(d){
                    return d.y+10;
                })
                .attr("stroke","black ")
                .attr("stroke-width","3px")
                .attr("fill","white")
                .attr("width","80")
                .attr("height","40")
                .classed("hide",function(d){
                    if(d.data.sprouse == undefined)
                    return true;
                    else return false;
                });

var imena = svg.append("g").selectAll("text")
                .data(information.descendants());
imena.enter().append("text")
             .text(function(d){
                return d.data.child;
             })
             .attr("x",function(d){
                return d.x-20;
             })
             .attr("y",function(d){
                return d.y+30;
             })
             .attr("dominant-baseline","middle")
             .attr("text-anchor","middle")
             .attr("font-size","20");

var bracniPartner = svg.append("g").selectAll("text")
                        .data(information.descendants());
bracniPartner.enter().append("text")
             .text(function(d){
                return d.data.sprouse;
             })
             .attr("x",function(d){
                return d.x+90;
             })
             .attr("y",function(d){
               return d.y+30;
           })
           .attr("dominant-baseline","middle")
           .attr("text-anchor","middle")
           .attr("font-size","20");
}

//----------------------------------------------------------------------------------------------------

//Statistika------------------------------------------------------------------------------------------
function statistika(){
const canvas = d3.select(".main")
            

const svg = canvas.append("svg");
svg.attr("width","1100")
    .attr("height","600")
    .attr("style","border : 3px #112a35 solid")
    .style("background-color","white")
    .append("text")
    .text("Titule")
    .attr("x",100)
    .attr("y",100)
    .attr("font-size",50)
    .attr("fill","black");

d3.select("svg")
    .style("opacity", 0)
    .transition().duration(1000).style("opacity", 1);

const data = [
        { label: "Grand Slam", value: 22 },
        { label: "ATP Finals", value: 6 },
        { label: "ATP Masters", value: 38 },
        { label: "ATP Tour 500", value: 15 },
        { label: "ATP Tour 200", value: 12 }
      ];
  
const pie = d3.pie()
        .value(function(d){
            return d.value;
        });
  
const arc = d3.arc()
              .innerRadius(0)
              .outerRadius(Math.min(500, 400) / 2);
  
const color = d3.scaleOrdinal()
                .domain(data.map(function(d){
                    return d.label;
                }))
                .range(d3.schemeSet3);

const g = svg.append("g")
             .attr("transform", "translate(550, 300)");
  
g.selectAll("path")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", d => color(d.data.label))
  .attr("stroke", "black")
  .attr("stroke-width", 1);

g.selectAll("text")
  .data(pie(data))
  .enter()
  .append("text")
  .text(function(d) {
     return d.data.label;
     })
  .attr("transform", function(d) { 
    return "translate(" + arc.centroid(d) + ")"; 
  })
  .style("text-anchor", "middle");

}
//----------------------------------------------------------------------------------------------------