import store from '../redux/store';
import actions from '../redux/actions';

export function togglePreview(){
    let preview = store.getState()["preview"];
    let bool = preview ? false : true;
    store.dispatch(
        actions.setPreview(bool)
    );
}

export function checkPreview(){
    return store.getState()["preview"];
}

export function getPreviewHiddenString(){
    let preview = store.getState()["preview"];
    return preview ? " hidden" : "";
}