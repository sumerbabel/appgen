import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Sistem } from '../../domain/sistem';
import { SistemUseCases } from '../../use-case/sistem-use-case';
import { _YAxis } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-update-sistem',
  templateUrl: './update-sistem.component.html',
  styleUrls: ['./update-sistem.component.scss']
})
export class UpdateSistemComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Actualizar Registro sistems';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

//canvas/ variables
// fin canvas variables

  constructor(
    private _sistemUseCases: SistemUseCases,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
    //canvas declaraciones

    //fin canvas declaraciones

  }

  // canvas funciones

  // fin canvas funcones

  sistem: Sistem;
  modalInput(sistem: Sistem): void {
    this.sistem = sistem;
  }

  ngOnInit(): void {
    this.getSistem(this.sistem);
    // collidingBalls();
  }

  getSistem(sistem: Sistem) {
    this._sistemUseCases.getById(sistem.id).subscribe(
      (resultGetSistem) => {
        this.sistem = Sistem.createSistem(resultGetSistem);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  updateSistem() {
    this._sistemUseCases.saveChanges(this.sistem.toDataPersistJson()).subscribe(
      (resultPut) => {
        this.alertService.openAlertInfo(resultPut);
        this.modalClose(this.sistem);
      },
      (error) => {
        if (this.sistem) {
          this.sistem.errors = [error];
        } else {
          this.alertService.openAlertWarning(error);
        }

      }
    );
  }

  validateSaveRegister() {
    if (this.sistem.isValid) {
      this.dialogService
        .openDialog({
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateSistem();
          }
        });
    }
  }

  cancelRegister() {
    if (this.sistem.isModified) {
      this.dialogService
        .openDialog({
          title: 'Cancelar Registro',
          textDialog:
            '¿Está seguro de CANCELAR el registro, al realizar esta acción se perderán los datos ingresados o modificados?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.modalCancel();
          }
        });
    } else {
      this.modalCancel();
    }
  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.SAVE:
        this.validateSaveRegister();
        break;
      case ActionGeneric.CANCEL:
        this.cancelRegister();
        break;
      case ActionGeneric.CLOSE:
        this.cancelRegister();
        break;
    }
  }

}

// // canvas class
// export class State {
//   display;
//   actors
//   constructor(display, actors) {
//     this.display = display;
//     this.actors = actors;
//   }

//   update(time) {

//     /**
//      * provide an update ID to let actors update other actors only once
//      * used with collision detection
//      */
//     const updateId = Math.floor(Math.random() * 1000000);
//     const actors = this.actors.map(actor => {
//       return actor.update(this, time, updateId);
//     });
//     return new State(this.display, actors);
//   }
// }


// class Vector {
//   x;
//   y;
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   add(vector) {
//     return new Vector(this.x + vector.x, this.y + vector.y);
//   }

//   subtract(vector) {
//     return new Vector(this.x - vector.x, this.y - vector.y);
//   }

//   multiply(scalar) {
//     return new Vector(this.x * scalar, this.y * scalar);
//   }

//   dotProduct(vector) {
//     return this.x * vector.x + this.y * vector.y;
//   }

//   get magnitude() {
//     return Math.sqrt(this.x ** 2 + this.y ** 2);
//   }

//   get direction() {
//     return Math.atan2(this.x, this.y);
//   }
// }

// export class Canvas {
//   canvas;
//   ctx;
//   constructor(parent = document.body, width = 400, height = 400) {
//     this.canvas = document.createElement('canvas');
//     this.canvas.width = width;
//     this.canvas.height = height;
//     parent.appendChild(this.canvas);
//     this.ctx = this.canvas.getContext('2d');
//   }

//   sync(state) {
//     this.clearDisplay();
//     this.drawActors(state.actors);
//   }

//   clearDisplay() {
//     // opacity controls the trail effect set to 1 to remove
//     this.ctx.fillStyle = 'rgba(255, 255, 255, .4)';
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
//     this.ctx.strokeStyle = 'black';
//     this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   drawActors(actors) {
//     for (let actor of actors) {
//       if (actor.type === 'circle') {
//         this.drawCircle(actor);
//       }
//     }
//   }

//   drawCircle(actor) {
//     this.ctx.beginPath();
//     this.ctx.arc(actor.position.x, actor.position.y, actor.radius, 0, Math.PI * 2);
//     this.ctx.closePath();
//     this.ctx.fillStyle = actor.color;
//     this.ctx.fill();
//   }
// }

// export class Ball {
//   id= Math.floor(Math.random() * 1000000)
//   type= 'circle'
//   position= new Vector(100, 100)
//   velocity= new Vector(5, 3)
//   radius= 25
//   color= 'blue'
//   collisions= []
//   constructor(config) {
//     Object.assign(this,
//       config
//     );
//   }

//   update(state, time, updateId) {

//     /**
//      * if slice occurs on too many elements, it starts to lag
//      * collisions is an array to allow multiple collisions at once
//      */
//     if (this.collisions.length > 10) {
//       this.collisions = this.collisions.slice(this.collisions.length - 3);
//     }

//     /**
//      * this is the most stable solution to avoid overlap
//      * but it is slightly inaccurate
//      */
//     for (let actor of state.actors) {
//       if (this === actor || this.collisions.includes(actor.id + updateId)) {
//         continue;
//       }

//       /**
//        * check if actors collide in the next frame and update now if they do
//        * innaccurate, but it is the easiest solution to the sticky collision bug
//        */
//       const distance = this.position.add(this.velocity).subtract(actor.position.add(actor.velocity)).magnitude;

//       if (distance <= this.radius + actor.radius) {
//         const v1 = collisionVector(this, actor);
//         const v2 = collisionVector(actor, this);
//         this.velocity = v1;
//         actor.velocity = v2;
//         this.collisions.push(actor.id + updateId);
//         actor.collisions.push(this.id + updateId);
//       }
//     }

//     // setting bounds on the canvas prevents balls from overlapping on update
//     const upperLimit = new Vector(state.display.canvas.width - this.radius, state.display.canvas.height - this.radius);
//     const lowerLimit = new Vector(0 + this.radius, 0 + this.radius);

//     // check if hitting left or right of container
//     if (this.position.x >= upperLimit.x || this.position.x <= lowerLimit.x) {
//       this.velocity = new Vector(-this.velocity.x, this.velocity.y);
//     }

//     // check if hitting top or bottom of container
//     if (this.position.y >= upperLimit.y || this.position.y <= lowerLimit.y) {
//       this.velocity = new Vector(this.velocity.x, -this.velocity.y);
//     }

//     const newX = Math.max(Math.min(this.position.x + this.velocity.x, upperLimit.x), lowerLimit.x);
//     const newY = Math.max(Math.min(this.position.y + this.velocity.y, upperLimit.y), lowerLimit.y);

//     return new Ball({
//       ...this,
//       position: new Vector(newX, newY),
//     });
//   }

//   get area() {
//     return Math.PI * this.radius ** 2;
//   }

//   get sphereArea() {
//     return 4 * Math.PI * this.radius ** 2;
//   }
// }

// // see elastic collision: https://en.wikipedia.org/wiki/Elastic_collision
// const collisionVector = (particle1, particle2) => {
//   return particle1.velocity
//     .subtract(particle1.position
//       .subtract(particle2.position)
//       .multiply(particle1.velocity
//         .subtract(particle2.velocity)
//         .dotProduct(particle1.position.subtract(particle2.position))
//         / particle1.position.subtract(particle2.position).magnitude ** 2
//       )

//       // add mass to the system
//       .multiply((2 * particle2.sphereArea) / (particle1.sphereArea + particle2.sphereArea))
//     );
// };

// const isMovingTowards = (particle1, particle2) => {
//   return particle2.position.subtract(particle1.position).dotProduct(particle1.velocity) > 0;
// };

// const runAnimation = animation => {
//   let lastTime = null;
//   const frame = time => {
//     if (lastTime !== null) {
//       const timeStep = Math.min(100, time - lastTime) / 1000;

//       // return false from animation to stop
//       if (animation(timeStep) === false) {
//         return;
//       }
//     }
//     lastTime = time;
//     requestAnimationFrame(frame);
//   };
//   requestAnimationFrame(frame);
// };

// export const random = (max = 9, min = 0) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// export const colors = ['red', 'green', 'blue', 'purple', 'orange'];

// export const collidingBalls = ({ width = 400, height = 400, parent = document.body, count = 50 } = {}) => {
//   const display = new Canvas(parent, width, height);
//   const balls = [];
//   for (let i = 0; i < count; i++) {
//     balls.push(new Ball({
//       radius: random(8, 3) + Math.random(),
//       color: colors[random(colors.length - 1)],
//       position: new Vector(random(width - 10, 10), random(height - 10, 10)),
//       velocity: new Vector(random(3, -3), random(3, -3)),
//     }));
//   }
//   let state = new State(display, balls);
//   runAnimation(time => {
//     state = state.update(time);
//     display.sync(state);
//   });
// };
