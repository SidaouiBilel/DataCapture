import {
  Component,
  OnInit
} from '@angular/core';
import {
  Stack
} from '../../models/stack.model';
import { NotificationService} from '@app/core';
import { TransferItem } from 'ng-zorro-antd';


@Component({
  selector: 'app-stacks-list',
  templateUrl: './stacks-list.component.html',
  styleUrls: ['./stacks-list.component.css']
})

export class StacksListComponent implements OnInit {

  editorOptions = {theme: 'vs', language: 'dockerfile', codeLens: false};
  code: string = `FROM mono:3.12

  ENV KRE_FEED https://www.myget.org/F/aspnetvnext/api/v2
  ENV KRE_USER_HOME /opt/kre

  RUN apt-get -qq update && apt-get -qqy install unzip

  ONBUILD RUN curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/kvminstall.sh | sh
  ONBUILD RUN bash -c "source $KRE_USER_HOME/kvm/kvm.sh \
      && kvm install latest -a default \
      && kvm alias default | xargs -i ln -s $KRE_USER_HOME/packages/{} $KRE_USER_HOME/packages/default"

  # Install libuv for Kestrel from source code (binary is not in wheezy and one in jessie is still too old)
  RUN apt-get -qqy install \
      autoconf \
      automake \
      build-essential \
      libtool
  RUN LIBUV_VERSION=1.0.0-rc2 \
      && curl -sSL https://github.com/joyent/libuv/archive/v\${LIBUV_VERSION}.tar.gz | tar zxfv - -C /usr/local/src \
      && cd /usr/local/src/libuv-$LIBUV_VERSION \
      && sh autogen.sh && ./configure && make && make install \
      && rm -rf /usr/local/src/libuv-$LIBUV_VERSION \
      && ldconfig

  ENV PATH $PATH:$KRE_USER_HOME/packages/default/bin

  # Extra things to test
  RUN echo "string at end"
  RUN echo must work 'some str' and some more
  RUN echo hi this is # not a comment
  RUN echo 'String with \${VAR} and another $one here'`;

  default: Stack[] = [];
  custom: Stack[] = [];
  selectedId: number = -1;
  description: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, esse. Vero quo quas,
  quisquam
  dolorem sed natus placeat fuga molestiae sapiente dolor eum in quos odio at quaerat incidunt
  magnam Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis nulla ipsum earum
  exercitationem aperiam quis harum reiciendis vero repellendus ab tenetur fuga nobis possimus, neque
  perspiciatis eum impedit quisquam sit? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
  Voluptates nesciunt tenetur debitis culpa, fugit libero adipisci excepturi repellendus, perferendis
  cupiditate deleniti accusamus rerum nobis necessitatibus voluptatem deserunt eum. Deserunt, eveniet. Lorem
  ipsum dolor, sit amet consectetur adipisicing elit. Unde nesciunt ut cum, culpa ducimus ipsam consectetur
  quas repellendus et quae quaerat, sequi sapiente, sint alias omnis perspiciatis adipisci! Quam,
  unde.`;


  list: TransferItem[] = [];
  disabled = false;

  constructor(private notification: NotificationService) {}

  ngOnInit() {
    try {
      for (let i = 0; i < 5; i++) {
        this.default.push({
          id: i,
          name: 'Deepkube Analytics'
        });
      }

      for (let j = 5; j < 15; j++) {
        this.custom.push({
          id: j,
          name: 'lorem ipsum dolar volus'
        });
      }

      for (let i = 0; i < 20; i++) {
        this.list.push({
          key: i.toString(),
          title: `Jupyterlab`,
          disabled: false
        });
      }


    } catch (error) {
      this.notification.error(error.message);
    }

  }

  selectionChanged(id) {
    console.log('happened outside');
    this.selectedId = id;
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
