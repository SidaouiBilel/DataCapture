


export function stateLabel(state){}
export function stateColor(state){
  if( Object.keys(RUN_STATES).includes(state) )  
    return RUN_STATES[state].color
  else
    return 'grey'
}

export const RUN_STATES = {
  'success':{label:'Success', color:'lightgreen'},
  'running':{label:'Running', color:'skyblue'},
  'failed':{label:'Failed', color:'#d66464'},
  'queued':{label:'Queued', color:'lightblue'},
  'scheduled':{label:'Scheduled', color:'lightgrey'},
  'upstream_failed':{label:'Upstream Failed', color:'#c5a3a3'},
}