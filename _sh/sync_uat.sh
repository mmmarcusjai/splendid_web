rsync -avz --exclude-from 'exclude-list.txt' -e 'ssh -i /Users/marcuschan/.ssh/MyKeyPair.pem' /Users/marcuschan/Sites/splendid_dev/* ec2-user@34.219.58.156:/data/www/dev/splendidgroup