# Interactive IOS Scale for Multiparty Interactions (IIMI): A Measure of Interpersonal Closeness with Multiple Interactants

> Open-Source Code Release for 
> *"Ice-Breaking Technology: Robots and Computers Can Foster Meaningful Connections between Strangers through In-Person Conversations"* 

![IOS_task_demo.gif](https://github.com/SeboLab/interactive_ios_scale/blob/main/IOS_task_demo.gif)


The Interactive IOS Scale for Multiparty Interactions (IIMI) was developed to measure the interpersonal closeness between three interactants with an intuitive drag-and drop interface for the project presented in the paper [Ice-Breaking Technology: Robots and Computers Can Foster Meaningful Connections between Strangers through In-Person Conversations](https://dl.acm.org/doi/10.1145/3544548.3581135) by [Alex Wuqi Zhang](mailto:alexwuqizhang@uchicago.edu), [Ting-Han Lin](mailto:tinghan@uchicago.edu), [Xuan Zhao](mailto:xuanzhao@stanford.edu), and [Sarah Sebo](mailto:sarahsebo@uchicago.edu) at the [Human-Robot Interaction Lab](https://hri.cs.uchicago.edu) at the University of Chicago. The Interactive IOS Scale for Multiparty Interactions was written in javascript for integration with Qualtrics by [Kaushal Addanki](mailto:kaushal.addanki@chicagobooth.edu), Research Application Developer at UChicago's Center for Decision Research.


This measure is adapted from Aron's Inclusion of Other in the Self Scale [1] to capture people's perception of social closeness among multiple interactants, and it is also grounded in a wealth of psychological studies that measured social distance based on physical distance between individuals [2] as well as their computerized protagonists [3].

[1] Aron, A., Aron, E. N., & Smollan, D. (1992). Inclusion of other in the self scale and the structure of interpersonal closeness. *Journal of personality and social psychology*, 63(4), 596.

[2] Holland, R. W., Roeder, U. R., Rick B. van, B., Brandt, A. C., & Hannover, B. (2004). Don't stand so close to me: The effects of self-construal on interpersonal closeness. *Psychological science*, 15(4), 237-242.

[3] Perry, A., Mankuta, D., & Shamay-Tsoory, S. G. (2015). OT promotes closer interpersonal distance among highly empathic individuals. *Social cognitive and affective neuroscience*, 10(1), 3-9.


## Integration with Qualtrics 

1. Define the following "embedded data" blocks in the Survey Flow tab. 

![qualtrics_embedded_data.png](https://github.com/SeboLab/interactive_ios_scale/blob/main/qualtrics_embedded_data.png)

2. Create a new Text/Graphic question in your Qualtrics survey of content type `Text`. 

3. Copy the code in `ios_task.js` into the custom JavaScript tab (Survey > Edit Question > Question Behavior > JavaScript). Please note that only the upgraded Qualtrics account has access to the JavaScript feature.

4. Copy and paste the following into the "HTML" view of the question content: 

```
<div style="text-align:center"><canvas class="myCanvas" height="${e://Field/canvas_height}px" style="border:1px solid #d3d3d3;" width="${e://Field/canvas_width}px"> Your browser does not support the HTML5 canvas tag.</canvas></div>
```

5. Qualtrics.SurveyEngine.setEmbeddedData(yourVarName, yourVarValue) will update the Qualtrics embedded data with the updated values

## Update
05/05/2024: ios_task.js is updated such that the question's next button will only show up after one of the circles is dragged. This update is meant to address the issue where participants did not attempt to move the circles at all and were still able to continue the survey.
