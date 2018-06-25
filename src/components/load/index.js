import vue from 'vue';
import load from './load.vue';

let loadObj=vue.extend(load);
let box=document.getElementById('load-box');
if(!box){
    box = document.createElement('div');
    box.id='load-box';
    document.body.appendChild(box);
}
let loadExample=new loadObj({
    el:box
});

export default loadExample;