# MariaDB




[root@Pro-lanzadera ~]# oc get templates -A | grep -i mariadb
openshift   mariadb-ephemeral                                   MariaDB database service, without persistent storage. For more information ab...   8 (3 generated)   3
openshift   mariadb-persistent                                  MariaDB database service, with persistent storage. For more information about...   9 (3 generated)   4
[root@Pro-lanzadera ~]#





# MySQL
[root@Pro-lanzadera ~]# oc get templates -A | grep -i mysql
openshift   mysql-ephemeral                                     MySQL database service, without persistent storage. For more information abou...   8 (3 generated)   3
openshift   mysql-persistent                                    MySQL database service, with persistent storage. For more information about u...   9 (3 generated)   4
[root@Pro-lanzadera ~]#





