import{j as e}from"./jsx-runtime-86dfebf6.js";import{B as i,M as t}from"./BarChart-9c825fb0.js";import{L as n,a as s,b as l,c as o,d}from"./RadialValueMarker-7b3f8322.js";const r=a=>e(i,{...a});r.defaultProps={series:e(t,{}),xAxis:e(n,{type:"category",tickSeries:e(s,{tickSize:15})}),yAxis:e(l,{type:"value",tickSeries:e(o,{label:e(d,{rotation:!1,format:a=>`${a*100}%`})})})};try{r.displayName="MarimekkoChart",r.__docgenInfo={description:"",displayName:"MarimekkoChart",props:{data:{defaultValue:null,description:"Data the chart will receive to render.",name:"data",required:!1,type:{name:"ChartNestedDataShape[]"}},series:{defaultValue:{value:"<MarimekkoBarSeries />"},description:"The series component that renders the bar components.",name:"series",required:!1,type:{name:"ReactElement<BarSeriesProps, FC<Partial<BarSeriesProps>>>"}},yAxis:{defaultValue:{value:`(
    <LinearYAxis
      type="value"
      tickSeries={
        <LinearYAxisTickSeries
          label={
            <LinearYAxisTickLabel
              rotation={false}
              format={(data) => \`\${data * 100}%\`}
            />
          }
        />
      }
    />
  )`},description:"The linear axis component for the Y Axis of the chart.",name:"yAxis",required:!1,type:{name:"ReactElement<LinearAxisProps, FC<Partial<LinearAxisProps>>>"}},xAxis:{defaultValue:{value:`(
    <LinearXAxis
      type="category"
      tickSeries={<LinearXAxisTickSeries tickSize={15} />}
    />
  )`},description:"The linear axis component for the X Axis of the chart.",name:"xAxis",required:!1,type:{name:"ReactElement<LinearAxisProps, FC<Partial<LinearAxisProps>>>"}},gridlines:{defaultValue:null,description:"The chart's background gridlines component.",name:"gridlines",required:!1,type:{name:"ReactElement<GridlineSeriesProps, FC<Partial<GridlineSeriesProps>>>"}},brush:{defaultValue:null,description:"The chart's brush component.",name:"brush",required:!1,type:{name:"ReactElement<ChartBrushProps, FC<Partial<ChartBrushProps>>>"}},secondaryAxis:{defaultValue:null,description:"Any secondary axis components. Useful for multi-axis charts.",name:"secondaryAxis",required:!1,type:{name:"ReactElement<LinearAxisProps, FC<Partial<LinearAxisProps>>>[]"}},id:{defaultValue:null,description:"Id of the chart.",name:"id",required:!1,type:{name:"string"}},width:{defaultValue:null,description:"Width of the chart. If not provided will autosize.",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"Height of the chart. If not provided will autosize.",name:"height",required:!1,type:{name:"number"}},margins:{defaultValue:null,description:"Margins for the chart.",name:"margins",required:!1,type:{name:"Margins"}},className:{defaultValue:null,description:"Classnames for the chart.",name:"className",required:!1,type:{name:"string"}},containerClassName:{defaultValue:null,description:"Classnames for the chart.",name:"containerClassName",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"Additional css styles.",name:"style",required:!1,type:{name:"StyleHTMLAttributes<SVGSVGElement>"}},center:{defaultValue:null,description:"Center the chart. Used mainly internally.",name:"center",required:!1,type:{name:"boolean"}},centerX:{defaultValue:null,description:"Center chart on X Axis only. Used mainly internally.",name:"centerX",required:!1,type:{name:"boolean"}},centerY:{defaultValue:null,description:"Center chart on Y Axis only. Used mainly internally.",name:"centerY",required:!1,type:{name:"boolean"}}}}}catch{}export{r as M};
