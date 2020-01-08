import { Component } from '@angular/core';
import { Track, Task } from './shared/Track.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { data } from './shared/data';
// import * as data from './shared/data.json';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  tracks: Track[] = data;

  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<Task[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given task to the target data array. This happens if
    // a task has been dropped on a different track.
    const eventData = {
      id: event.item.element.nativeElement.id,
      previousContainerId: event.previousContainer.id,
      currentContainerId: event.container.id,
      previousContainerData: event.previousContainer.data,
      currentContainerData: event.container.data,
    };


    if (event.previousContainer === event.container) {
      delete eventData.previousContainerData;
      delete eventData.previousContainerId;
      console.log(eventData);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(eventData);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}
