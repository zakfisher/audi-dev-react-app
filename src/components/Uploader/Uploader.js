import React, {Component} from 'react';
import actions from '../../redux/actions';
import store from '../../redux/store';
import files from '../../helpers/files';
import Button from '../Button/Button';
import './Uploader.sass';

const completeFileUpload = downloadURL => {
  store.dispatch(actions.completeFileUpload(downloadURL));
};

class Uploader extends Component {
  constructor() {
    super();

    this.state = {
      progress: 0
    };

    this.uploadFile = this
      .uploadFile
      .bind(this);
  }

  uploadFile(e) {
    // Upload file to Firebase (our files.upload method returns the task and puts
    // the file)
    const file = e.target.files[0];
    const task = files.upload(file, 'uploads/' + file.name);
    task.on('state_changed',

    // progress
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({progress});
    },

    // error
    err => {
      console.warn('Error with uploading file.', err);
    },

    // complete
    () => completeFileUpload(task.snapshot.downloadURL));
  }

  render() {
    return (
      <div className="Uploader">
        <Button text="Browse..." name="browse">
          <input type="file" onChange={this.uploadFile}/>
        </Button>
        <progress value={this.state.progress} max="100"/>
      </div>
    );
  }
}

export default Uploader;
