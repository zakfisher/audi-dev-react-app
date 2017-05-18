import React, {Component} from 'react';
import NoteForm from '../../components/NoteForm/NoteForm';
import Markdown from '../../components/Markdown/Markdown';
import './NoteEditor.sass';

class NoteEditor extends Component {

  static propTypes = {};

  constructor() {
    super();

    this.state = {
      title: '',
      content: ''
    };
  }

  get preview() {
    const {notes, match} = this.props;
    const {noteId} = match.params;
    const note = notes[noteId];
    const title = note ? note.title : this.state.title;
    const content = note ? note.content : this.state.content;
    return {title, content};
  }

  componentDidMount() {
    this.setState(this.preview);
  }

  render() {
    if (!this.props.dataReady) {
      return null;
    }
    return (
      <div className="NoteEditor row">

        {/* Form */}
        <div className="form col-12 tab-6">
          <NoteForm {...this.props} editor={this}/>
        </div>

        {/* Preview */}
        <div className="preview col-12 tab-6">
          <article className="NoteView">
            <h4>Live Preview</h4>
            <div className="title">
              <h1>{this.state.title}</h1>
            </div>
            <div className="content">
              <Markdown content={this.state.content}/>
            </div>
          </article>

        </div>
      </div>
    );
  }
}

export default NoteEditor;
