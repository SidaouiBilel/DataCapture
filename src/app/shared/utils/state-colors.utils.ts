


export function stateLabel(state){}
export function stateColor(state){
  if( state in Object.keys(RUN_STATES)) 
    return RUN_STATES[state].color
  else
    return 'lightgrey'
}

export const RUN_STATES = {
  'success':{label:'Success', color:'lightgreen'},
  'running':{label:'Running', color:'skyblue'},
  'failed':{label:'Failed', color:'red'},
  'queued':{label:'Queued', color:'lightblue'},
  'scheduled':{label:'Scheduled', color:'grey'},
}