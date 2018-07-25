module.exports = {
  ldap: {
    url: 'ldap://dc02.miranda-media.ru:389',
    bindDN: "dalvdn",
    bindCredentials: 'la637Y?5cvhAtL',
    searchBase: "ou=MIRANDA-MEDIA,dc=miranda-media,dc=ru",
    searchFilter: 'sAMAccountName={{username}}'
  }
}
