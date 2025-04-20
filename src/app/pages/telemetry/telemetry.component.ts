import { Component ,OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {GlobalService} from '../../services/global.service';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js/auto';
import { SubsystemService } from '../../services/subsystem.service';


@Component({
  selector: 'app-telemetry',
  standalone: false,
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.css'
})
export class TelemetryComponent {
  selectedTab: string = 'add';
  loginForm: FormGroup;
  isSubmitted = false;
  users: any[] = [];
  logs = [
    {id: 1, user: 'Ahmed', action: 'Added User', date: '2025-03-04T14:23:45'},
    {id: 2, user: 'Mohamed', action: 'Deleted User', date: '2025-03-03T10:15:30'}
  ];
  filteredLogs = [...this.logs];
  logDate: string = '';
  logName: string = '';

  constructor(private fb: FormBuilder, private apiService: AuthService, public global: GlobalService , private subsystemService: SubsystemService) {
    console.log(this.global.user_role);
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  ngOnInit() {
    this.fetchUsers();
    this.loadAllSubsystemData();
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  
  loadAllSubsystemData() {
    this.loadThermals();
    this.loadTelemetries();
    this.loadPowers();
    this.loadPayloads();
    this.loadOBCs();
    this.loadGPS();
    this.loadControls();
    this.loadCommunications();
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.apiService.addUser(this.loginForm.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User added successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.loginForm.reset(); // Reset form
            this.isSubmitted = false; // Reset validation state
            this.users = data
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error?.message || 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      });
    }



    
  }




  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUsers(id).subscribe({
          next: (data ) => {
            this.users = data
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'User has been deleted successfully.',
              confirmButtonText: 'OK'
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: err.error?.message || 'Something went wrong. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }


  filterLogs() {
    this.filteredLogs = this.logs.filter(log =>
      (this.logDate ? log.date.includes(this.logDate) : true) &&
      (this.logName ? log.user.toLowerCase().includes(this.logName.toLowerCase()) : true)
    );
  }

  loadThermals() {
    this.subsystemService.getThermals().subscribe(data => {
      const labels = data.map((d: any) => d.timestamp);
      const internal = data.map((d: any) => d.internal_temperature);
      const external = data.map((d: any) => d.external_temperature);

      new Chart('thermalLineChart', {
        type: 'line',
        data: {
          labels,
          datasets: [
            { label: 'Internal Temp', data: internal, borderColor: 'red' },
            { label: 'External Temp', data: external, borderColor: 'blue' }
          ]
        }
      });
    });
  }

  loadTelemetries() {
    this.subsystemService.getTelemetries().subscribe(data => {
      const sensors = data.map((d: any) => ({
        gps: d.sensor_gps,
        thermal: d.sensor_thermal,
        power: d.sensor_power,
        control: d.sensor_control,
        payload: d.sensor_payload,
        obc: d.sensor_obc
      }));

      const latest = sensors[sensors.length - 1];
      new Chart('telemetryRadar', {
        type: 'radar',
        data: {
          labels: ['GPS', 'Thermal', 'Power', 'Control', 'Payload', 'OBC'],
          datasets: [{
            label: 'Sensors',
            data: [
              latest.gps,
              latest.thermal,
              latest.power,
              latest.control,
              latest.payload,
              latest.obc
            ],
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            borderColor: 'blue'
          }]
        }
      });
    });
  }


  selectedItem: string = ''; 

  selectItem(item: string) {
    this.selectedItem = item;
  }

  loadPowers() {
    this.subsystemService.getPowers().subscribe(data => {
      const timestamps = data.map((d: any) => d.timestamp);
      const voltage = data.map((d: any) => d.Battery_voltage);
      const level = data.map((d: any) => d.Battery_level);

      new Chart('batteryLine', {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [
            { label: 'Battery Voltage (V)', data: voltage, borderColor: 'purple' },
            { label: 'Battery Level (%)', data: level, borderColor: 'green' }
          ]
        }
      });
    });
  }

  loadPayloads() {
    this.subsystemService.getPayloads().subscribe(data => {
      const compression = data.map((d: any) => d.compression_ratio_value);
      const memory = data.map((d: any) => d.memory_size);

      new Chart('payloadBar', {
        type: 'bar',
        data: {
          labels: data.map((_: any, i: number) => `Payload ${i + 1}`),
          datasets: [
            { label: 'Compression Ratio', data: compression, backgroundColor: 'blue' },
            { label: 'Memory Size (MB)', data: memory, backgroundColor: 'gray' }
          ]
        }
      });
    });
  }

  loadOBCs() {
    this.subsystemService.getOBCs().subscribe(data => {
      const cpu = data.map((d: any) => d.cpu_usage);
      const memory = data.map((d: any) => d.memory_usage);
      const timestamps = data.map((d: any) => d.timestamp);

      new Chart('obcUsageLine', {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [
            { label: 'CPU Usage (%)', data: cpu, borderColor: 'red' },
            { label: 'Memory Usage (%)', data: memory, borderColor: 'blue' }
          ]
        }
      });
    });
  }

  loadGPS() {
    this.subsystemService.getGPS().subscribe(data => {
      const altitude = data.map((d: any) => d.altitude);
      const velocity = data.map((d: any) => d.velocity);
      const timestamps = data.map((d: any) => d.timestamp);

      new Chart('gpsAltitudeVelocity', {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [
            { label: 'Altitude (km)', data: altitude, borderColor: 'teal' },
            { label: 'Velocity (km/h)', data: velocity, borderColor: 'darkblue' }
          ]
        }
      });
    });
  }

  loadControls() {
    this.subsystemService.getControls().subscribe(data => {
      const statusCount : { [key: string]: number } = { Active: 0, Standby: 0, Error: 0 };
      data.forEach((d: any) =>{
        statusCount[d.system_status as keyof typeof statusCount]++;
      });

      new Chart('systemStatusPie', {
        type: 'pie',
        data: {
          labels: Object.keys(statusCount),
          datasets: [{
            data: Object.values(statusCount),
            backgroundColor: ['green', 'orange', 'red']
          }]
        }
      });
    });
  }

  loadCommunications() {
    this.subsystemService.getCommunications().subscribe(data => {
      const signal = data.map((d: any) => d.signal_strength);
      const latency = data.map((d: any) => d.latency);
      const timestamps = data.map((d: any) => d.timestamp);

      new Chart('signalStrengthLine', {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [{
            label: 'Signal Strength (dBm)',
            data: signal,
            borderColor: 'blue'
          }]
        }
      });

      new Chart('latencyBar', {
        type: 'bar',
        data: {
          labels: timestamps,
          datasets: [{
            label: 'Latency (ms)',
            data: latency,
            backgroundColor: 'pink'
          }]
        }
      });
    });
  }






}
