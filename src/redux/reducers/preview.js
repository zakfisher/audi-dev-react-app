import actions from '../actions';

const {
    SET_PREVIEW
} = actions;

export function preview(state = false, action) {
    switch (action.type) {
        case SET_PREVIEW:
            return action.preview;

        default:
            return state;
    }
}