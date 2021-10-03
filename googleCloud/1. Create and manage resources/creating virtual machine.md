# Creating a new VM instance (Linux)

## Activating the cloud shell
Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.
Cloud Shell is a Debian-based virtual machine loaded with all the development tools you'll need

To activate it, just click on the terminal icon (Activate Cloud Shell button) in the title bar of the cloud console page (console.cloud.google.com) in the top right toolbar. It may take some time to start
If it prompts for access, press continue

<hr>
<br>

## Very basic commands
```gcloud auth list```  to show the list of active accounts
    It may ask to authorize the shell first, click on authorize button

```gcloud config list project```    to list the project ID

Regions and zones
Certain Compute Engine resources live in regions or zones. 
A region is a specific geographical location where you can run your resources. Each region has one or more zones. For example, the ```us-central1``` region denotes a region in the Central United States that has zones ```us-central1-a```, ```us-central1-b```, ```us-central1-c```, and ```us-central1-f```

Resources that live in a zone are referred to as zonal resources. 
Virtual machine Instances and persistent disks live in a zone. To attach a persistent disk to a virtual machine instance, both resources must be in the same zone. 
Similarly, if you want to assign a static IP address to an instance, the instance must be in the same region as the static IP

<hr>
<br>

## Task 1 (Create a new instance from the cloud console)
Steps ----> <br>
Navigation menu --> Compute Engine --> VM instances (may take some time sto start) --> Create Instance

Parameters for a new instance
Name                Name of the VM instance
Region & zone       Region & zone of the VM instances respectively
Series              Name of the series of the computer (VM instance) used
Machine Type        Configuration of the machine (involving version, cores, threads, RAM memory, disk space) Note: A new project has a default resource quota, which may limit the number of CPU cores
Boot Disk           Type of the operating system used (including Debian, Ubuntu, CoreOS, and premium images such as Red Hat Enterprise Linux and Windows Server)
Firewall            Firewall settings to access a web server that you'll install later

select the required field names and click on the create button (will take some time to create)
Once created, it would be added to the list of installed VMs on the console.
This machine can now be used remotely using SSH (secure shell) --> to do so, click on SSH option --> This will launch the SSH client directly from the browser

<hr>
<br>

## Task 2 (Install an NGINX web server)
Steps ----> <br>
SSH into your VM and get the root privileges by running the ```sudo su -``` command in the SSH client terminal window --> with root privileges, update your operating system ```apt-get update``` --> install the NGINX web server with this command ```apt-get install nginx -y``` --> confirm that NGINX is running with this command ```ps auwx | grep nginx```

Now, that the server is created, you can see the web page. 
In the Cloud Console and click the External IP link in the row for your machine, or add the External IP value to ```http://EXTERNAL_IP/``` in a new browser window or tab --> As of now, it would show welcome to NGINX

<hr>
<br>

## Task 3 (Create a new instance with gcloud terminal)
In the Cloud Shell, use gcloud to create a new virtual machine instance from the command line with this command ```gcloud compute instances create gcelab2 --machine-type n1-standard-2 --zone us-central1-f```

Here, 
```gcelab2``` is the name of the VM isntance
```n1-standard-2``` is the machine type, can also use other types like ```n1-highmem-4 or n1-highcpu-4```
```us-central1-f``` is the zone 
(as clearly indicated by the flags)
Apart from this, this VM would have other default settings like Debian linux OS and other things that are default for a machinne like RAM memory, disk space etc.

To see the machine settings and help, use this command ```gcloud compute instances create --help```

Note: You can set the default region and zones that gcloud uses if you are always working within one region/zone and you don't want to append the ```--zone``` flag every time. To do this, run these commands:
```gcloud config set compute/zone ...```
```gcloud config set compute/region ...```
To exit help press ```CTRL+C``` or ```CMD+C```

To SSH into the VM instance, use this command ```gcloud compute ssh gcelab2 --zone us-central1-f``` (If the zone is not specified globally, specify the zone also for the VM instance) --> press Y to continue --> enter the passphrase (if any or press Enter for blank passphrase) --> exit
 
<hr>
<br>
<br>

# Creating a VM instance (windows)

## From the google cloud console
Steps ----> <br>
Navigation Menu --> Compute engine --> VM instances --> Create instance --> select series --> In the Boot disk section, click Change to begin configuring your boot disk --> Choose a windows server OS like ```Windows Server 2012 R2 Datacenter```, and then click Select. Leave all other settings as their defaults --> create

## RDP into the windows server OS
Steps after authorizing the cloud shell and making sure to be in correct active account and correct project ID.

To see whether the server instance is ready for an RDP connection, use this command ```gcloud compute instances get-serial-port-output instance-1``` --> if prompted, type n and press Enter.

Repeat the command until you see the following in the command output, which tells you that the OS components have initialized and the Windows Server is ready to accept your RDP connection

After the instance setup is finished and is ready to use, set a password for logging in into the RDP, use this command ```gcloud compute reset-windows-password [name_of_instance] --zone us-central1-a --user admin``` --> enter Y to confirm --> Password would be reset and displayed in the cloud shell --> now connect to the VM using RDP client in your PC (windows) or use a third-party plugin for this