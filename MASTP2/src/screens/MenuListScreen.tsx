import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';

export default function MenuListScreen({ navigation }: any) {
  const { items } = useMenu();

  const renderItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate('ItemDetails', { item })}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemMain}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={[styles.courseBadge, { backgroundColor: getCourseColor(item.course) + '22' }]}>
            <Text style={[styles.courseText, { color: getCourseColor(item.course) }]}>{item.course}</Text>
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>

        <View style={styles.itemSide}>
          <Text style={styles.itemPrice}>R {item.price}</Text>
          <View style={styles.addedIndicator}>
            <Text style={styles.addedText}>✓</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCourseColor = (course: string) => {
    switch(course) {
      case 'Breakfast': return '#FFD93D';
      case 'Light Meals': return '#6A89CC';
      case 'Desserts': return '#4A90E2';
      default: return '#95A5A6';
    }
  }

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No dishes yet</Text>
          <Text style={styles.emptyText}>
            Add your delicious dishes to see them here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F2', paddingTop: 20 },
  listContent: { padding: 15, paddingBottom: 30 },

  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },

  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  itemMain: {
    flex: 1,
    marginRight: 15,
  },

  itemName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#34495E',
    marginBottom: 4,
  },

  courseBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },

  courseText: {
    fontSize: 12,
    fontWeight: '700',
  },

  itemDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },

  itemSide: {
    alignItems: 'flex-end',
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#34495E',
    marginBottom: 8,
  },

  addedIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 10,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
  },
});
