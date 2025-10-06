import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { MenuItem } from '../types';

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Golden Sunrise Omelette', description: 'Eggs, cheddar & peppers', course: 'Breakfast', price: '95' },
  { id: '2', name: 'Tropical Berry Smoothie', description: 'Mixed berries & coconut milk', course: 'Breakfast', price: '120' },
  { id: '3', name: 'Maple Cinnamon Pancakes', description: 'Fluffy pancakes with maple syrup', course: 'Breakfast', price: '140' },
  { id: '4', name: 'Full English Delight', description: 'Eggs, mushrooms & baked beans', course: 'Breakfast', price: '160' },

  { id: '5', name: 'Mediterranean Falafel Wrap', description: 'Chickpeas, hummus & veggies', course: 'Light Meals', price: '180' },
  { id: '6', name: 'Grilled Herb Chicken Bowl', description: 'Chicken, quinoa & greens', course: 'Light Meals', price: '150' },
  { id: '7', name: 'Spinach & Feta Quiche', description: 'Cheese & spinach', course: 'Light Meals', price: '130' },
  { id: '8', name: 'Tomato Basil Sandwich', description: 'Fresh tomato, basil & mozzarella', course: 'Light Meals', price: '110' },

  { id: '9', name: 'Dark Chocolate Brownie', description: 'Rich & gooey with chocolate chips', course: 'Desserts', price: '85' },
  { id: '10', name: 'Velvet Raspberry Cupcake', description: 'Cream cheese frosting', course: 'Desserts', price: '95' },
  { id: '11', name: 'Zesty Lemon Cheesecake', description: 'Tangy & creamy dessert', course: 'Desserts', price: '100' },
  { id: '12', name: 'Fresh Fruit Tart', description: 'Seasonal fruits on buttery crust', course: 'Desserts', price: '110' },
];

export default function HomeScreen({ navigation }: any) {
  const { items, addItem, getTotalItems } = useMenu();

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.course}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.price}>R {item.price}</Text>
        <TouchableOpacity 
          style={[styles.addBtn, items.some(i => i.id === item.id) && styles.addedBtn]} 
          onPress={() => addItem(item)}
          disabled={items.some(i => i.id === item.id)}
        >
          <Text style={styles.addBtnText}>
            {items.some(i => i.id === item.id) ? '✓' : '+'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/images/myP.png')}
            style={styles.logo}
          />
          <Text style={styles.restaurantName}>Christoffel's Cuisine</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.counterLabel}>Selected</Text>
          <View style={styles.counterCircle}>
            <Text style={styles.counterNumber}>{getTotalItems()}</Text>
          </View>
        </View>
      </View>

      {/* MENU LIST */}
      <FlatList
        data={MENU_ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    padding: 18,
    backgroundColor: '#4A90E2', // header bleu moderne
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  restaurantName: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  headerRight: {
    alignItems: 'center',
  },
  counterLabel: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  counterCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterNumber: {
    color: '#4A90E2',
    fontWeight: '700',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: { flex: 1 },
  cardRight: { justifyContent: 'space-between', alignItems: 'flex-end' },
  name: { fontSize: 17, fontWeight: '700', color: '#34495E', marginBottom: 6 },
  
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D6EAF8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F618D',
  },

  description: { fontSize: 14, color: '#7F8C8D', marginBottom: 8 },
  price: { fontSize: 16, fontWeight: '700', color: '#1F618D', marginBottom: 6 },
  addBtn: {
    backgroundColor: '#4A90E2', 
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedBtn: { backgroundColor: '#27AE60' },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
